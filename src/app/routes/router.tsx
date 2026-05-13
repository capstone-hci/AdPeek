import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@app/layout/RootLayout';
import HomePage from '@app/pages/home/HomePage';
import StartPage from '@app/pages/start/StartPage';
import { paths } from '@app/routes/path';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: paths.start,
        element: <StartPage />,
      },
    ],
  },
]);

export default router;
