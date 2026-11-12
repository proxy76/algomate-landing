"""
Tests for POST /api/contact/ — the only endpoint.

    cd backend && SECRET_KEY=test python manage.py test

No database and no SMTP: SimpleTestCase plus Django's in-memory mail outbox.
"""

import json

from django.core import mail
from django.core.cache import cache
from django.test import SimpleTestCase, override_settings

URL = "/api/contact/"

VALID = {
    "name": "Popescu Andrei",
    "email": "andrei@example.com",
    "phone": "0712 345 678",
    "message": "Bună ziua,\naș vrea meditații la matematică.",
    "tutoring_types": ["Matematică BAC"],
    "is_robot_verified": True,
    "website": "",
}


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
    DEFAULT_FROM_EMAIL="site@example.com",
    CONTACT_RECIPIENT_EMAIL="owner@example.com",
    ALLOWED_HOSTS=["testserver"],
)
class ContactEndpointTests(SimpleTestCase):
    def setUp(self):
        # Throttle history and the per-email counters live in the cache.
        cache.clear()
        mail.outbox = []

    def post(self, payload=None, ip="203.0.113.10", **overrides):
        body = {**VALID, **overrides} if payload is None else payload
        return self.client.post(
            URL,
            data=json.dumps(body),
            content_type="application/json",
            # What nginx sends: one address, the visitor's.
            HTTP_X_FORWARDED_FOR=ip,
        )

    # ── the happy path ──────────────────────────────────────────────────────

    def test_valid_submission_sends_one_email(self):
        r = self.post()
        self.assertEqual(r.status_code, 200, r.content)
        self.assertEqual(len(mail.outbox), 1)
        msg = mail.outbox[0]
        self.assertEqual(msg.to, ["owner@example.com"])
        self.assertEqual(msg.from_email, "site@example.com")
        self.assertIn("Popescu Andrei", msg.subject)
        self.assertIn("0712 345 678", msg.body)
        self.assertIn("Matematică BAC", msg.body)
        self.assertIn("aș vrea meditații", msg.body)

    def test_reply_goes_to_the_visitor(self):
        self.post()
        self.assertEqual(mail.outbox[0].reply_to, ["andrei@example.com"])

    def test_tutoring_types_are_optional(self):
        payload = {k: v for k, v in VALID.items() if k != "tutoring_types"}
        r = self.post(payload)
        self.assertEqual(r.status_code, 200, r.content)
        self.assertIn("Nespecificat", mail.outbox[0].body)

    # ── validation ──────────────────────────────────────────────────────────

    def assertRejected(self, **overrides):
        r = self.post(**overrides)
        self.assertEqual(r.status_code, 400, r.content)
        self.assertEqual(mail.outbox, [])
        return r

    def test_honeypot_rejects(self):
        self.assertRejected(website="https://spam.example")

    def test_unticked_robot_box_rejects(self):
        self.assertRejected(is_robot_verified=False)

    def test_bad_email_rejects(self):
        self.assertRejected(email="not-an-email")

    def test_bad_phone_rejects(self):
        for phone in ["abc", "12", "0712345678; DROP", "٠٧١٢٣٤٥٦٧٨", "⁰⁷¹²³⁴⁵⁶"]:
            with self.subTest(phone=phone):
                cache.clear()
                self.assertRejected(phone=phone)

    def test_unknown_tutoring_type_rejects(self):
        self.assertRejected(tutoring_types=["Chimie"])

    def test_oversized_message_rejects(self):
        self.assertRejected(message="x" * 2001)

    def test_header_injection_in_name_is_a_400_not_a_500(self):
        for name in [
            "Ana\nBcc: victim@example.com",
            "Ana\r\nBcc: victim@example.com",
            "Ana Bcc: victim@example.com",
            "Ana\x00",
        ]:
            with self.subTest(name=name):
                cache.clear()
                self.assertRejected(name=name)

    def test_email_cannot_smuggle_a_second_address_into_reply_to(self):
        self.assertRejected(email="a@example.com\nBcc: victim@example.com")
        self.assertRejected(email="a@example.com, victim@example.com")

    def test_message_keeps_newlines_but_not_control_characters(self):
        self.assertEqual(self.post(message="rând 1\nrând 2\tx").status_code, 200)
        cache.clear()
        mail.outbox = []
        self.assertRejected(message="salut\x1b[31m")

    # ── transport ───────────────────────────────────────────────────────────

    def test_get_is_not_allowed(self):
        self.assertEqual(self.client.get(URL).status_code, 405)

    def test_only_json_is_parsed(self):
        r = self.client.post(URL, data=VALID)  # multipart form
        self.assertEqual(r.status_code, 415)
        self.assertEqual(mail.outbox, [])

    def test_responses_are_json_even_when_html_is_requested(self):
        # The browsable API would otherwise answer a browser with an HTML page.
        browser = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        r = self.client.get(URL, HTTP_ACCEPT=browser)
        self.assertEqual(r.status_code, 405)
        self.assertEqual(r["Content-Type"], "application/json")

    def test_oversized_body_is_refused(self):
        r = self.post(message="x" * 100_000)
        self.assertIn(r.status_code, (400, 413))
        self.assertEqual(mail.outbox, [])

    # ── rate limits ─────────────────────────────────────────────────────────

    def test_throttle_is_per_visitor_not_global(self):
        """The regression this file exists for: one visitor hitting the limit
        must not lock the form for everyone else."""
        for i in range(5):
            r = self.post(ip="203.0.113.1", email=f"a{i}@example.com")
            self.assertEqual(r.status_code, 200, r.content)
        self.assertEqual(self.post(ip="203.0.113.1", email="a9@example.com").status_code, 429)
        # A different visitor is unaffected.
        self.assertEqual(self.post(ip="203.0.113.2", email="b@example.com").status_code, 200)

    def test_invalid_posts_count_against_the_sender_only(self):
        for _ in range(5):
            self.post(ip="198.51.100.7", email="nope")
        self.assertEqual(self.post(ip="198.51.100.7").status_code, 429)
        self.assertEqual(self.post(ip="198.51.100.8").status_code, 200)

    def test_client_cannot_pick_its_own_bucket(self):
        """nginx overwrites X-Forwarded-For, so a real request carries exactly
        one address. If a spoofed chain ever did get through, only the last
        hop — the one nginx wrote — may count."""
        for i in range(5):
            self.post(ip=f"10.0.0.{i}, 203.0.113.50", email=f"c{i}@example.com")
        r = self.post(ip="10.9.9.9, 203.0.113.50", email="c9@example.com")
        self.assertEqual(r.status_code, 429)

    def test_probing_with_get_does_not_spend_the_form_allowance(self):
        for _ in range(20):
            r = self.client.get(URL, HTTP_X_FORWARDED_FOR="203.0.113.77")
            self.assertEqual(r.status_code, 405)
        self.assertEqual(self.post(ip="203.0.113.77").status_code, 200)

    def test_per_email_limit(self):
        for i in range(3):
            r = self.post(ip=f"203.0.113.{100 + i}")
            self.assertEqual(r.status_code, 200, r.content)
        r = self.post(ip="203.0.113.200")
        self.assertEqual(r.status_code, 429)
        self.assertEqual(len(mail.outbox), 3)

    def test_per_email_limit_ignores_case(self):
        for i in range(3):
            self.post(ip=f"203.0.113.{100 + i}")
        r = self.post(ip="203.0.113.201", email="ANDREI@example.com")
        self.assertEqual(r.status_code, 429)

    # ── failure ─────────────────────────────────────────────────────────────

    @override_settings(EMAIL_BACKEND="core.tests.BrokenBackend")
    def test_smtp_failure_is_a_clean_500_and_does_not_count(self):
        with self.assertLogs("core.views", level="ERROR") as logs:
            r = self.post()
        self.assertEqual(r.status_code, 500)
        self.assertEqual(r.json(), {"detail": "Failed to send email."})
        # The visitor's details must not be written to the journal.
        joined = "\n".join(logs.output)
        self.assertNotIn("andrei@example.com", joined)
        self.assertNotIn("0712", joined)
        # A failed send must not use up one of the address's three attempts.
        self.assertIsNone(cache.get("contact:email:andrei@example.com"))


class BrokenBackend:
    def __init__(self, *args, **kwargs):
        pass

    def send_messages(self, messages):
        raise OSError("smtp is down")
