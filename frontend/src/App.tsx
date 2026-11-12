import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

/** The routes, and why each page is its own chunk, are in router.tsx. */
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
