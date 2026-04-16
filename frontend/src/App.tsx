import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Curriculum from './pages/Curriculum';
import Signup from './pages/Signup';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

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
        path: '/curriculum',
        element: <Curriculum />,
      },
      {
        path: '/inscriere',
        element: <Signup />,
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
