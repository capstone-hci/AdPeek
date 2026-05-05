import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@app/layout/RootLayout';
import HomePage from '@app/pages/home/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
