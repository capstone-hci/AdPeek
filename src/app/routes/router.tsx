import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@app/layout/RootLayout';
import HomePage from '@app/pages/home/HomePage';
import StartPage from '@app/pages/start/StartPage';
import ConsentPage from '@app/pages/participant/consent/ConsentPage';
import CalibrationPage from '@app/pages/participant/calibration/CalibrationPage';
import { paths } from '@app/routes/path';
import ConnectionPage from '@app/pages/participant/connection/ConnectionPage';

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
      {
        path: paths.consent,
        element: <ConsentPage />,
      },
      {
        path: paths.calibration,
        element: <CalibrationPage />,
      },
      {
        path: paths.connection,
        element: <ConnectionPage />,
      },
    ],
  },
]);

export default router;
