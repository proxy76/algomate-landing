import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import InformaticaBac from './pages/InformaticaBac';
import Curriculum from './pages/Curriculum';
import Signup from './pages/Signup';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ThankYou from './pages/ThankYou';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/servicii',
        element: <Services />,
      },
      {
        path: '/meditatii-informatica-bac',
        element: <InformaticaBac />,
      },
      {
        path: '/curriculum',
        element: <Curriculum />,
      },
      {
        path: '/inscriere',
        element: <Signup />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/blog/:slug',
        element: <BlogPost />,
      },
      {
        path: '/multumim',
        element: <ThankYou />,
      },
      {
        path: '/termeni-si-conditii',
        element: <TermsAndConditions />,
      },
      {
        path: '/politica-de-confidentialitate',
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
