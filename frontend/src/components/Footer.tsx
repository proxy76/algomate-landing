import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a] relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-base font-semibold text-[#f0f0f0] tracking-wide mb-3">
              ALGO<span className="text-[#e8734a]">MATE</span>
            </h3>
            <p className="text-sm text-[#666] leading-relaxed">
              Partenerul tău de încredere pentru excelență în educație.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium text-[#888] uppercase tracking-wider mb-4">
              Navigare
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Acasă', href: '/' },
                { name: 'Servicii', href: '/servicii' },
                { name: 'Curriculum', href: '/curriculum' },
                { name: 'Înscrie-te', href: '/inscriere' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#666] hover:text-[#e8734a] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium text-[#888] uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-[#666]">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#555]" />
                algomate.razvan@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-[#555]" />
                București, România
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-medium text-[#888] uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[#666] hover:text-[#e8734a] transition-colors">
                  Termeni și Condiții
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#666] hover:text-[#e8734a] transition-colors">
                  Politica de Confidențialitate
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#555]">
          <p>&copy; {new Date().getFullYear()} AlgoMate. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
