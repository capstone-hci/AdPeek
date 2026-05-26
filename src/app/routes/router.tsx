import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@app/layout/RootLayout';
import HomePage from '@app/pages/home/HomePage';
import StartPage from '@app/pages/start/StartPage';
import ConsentPage from '@app/pages/participant/consent/ConsentPage';
import CalibrationPage from '@app/pages/participant/calibration/CalibrationPage';
import ConnectionPage from '@app/pages/participant/connection/ConnectionPage';
import ReadyPage from '@app/pages/participant/ready/ReadyPage';
import ViewPage from '@app/pages/participant/view/ViewPage';
import CompletePage from '@app/pages/participant/complete/CompletePage';
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
      {
        path: paths.step4.ready,
        element: <ReadyPage />,
      },
      {
        path: paths.step4.view,
        element: <ViewPage />,
      },
      {
        path: paths.step4.complete,
        element: <CompletePage />,
      },
    ],
  },
]);

export default router;
