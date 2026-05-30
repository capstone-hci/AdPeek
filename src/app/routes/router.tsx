import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@app/layout/RootLayout';
import StartPage from '@app/pages/start/StartPage';
import ConsentPage from '@app/pages/participant/step1/ConsentPage';
import CalibrationPage from '@app/pages/participant/step2/CalibrationPage';
import ConnectionPage from '@app/pages/participant/step3/ConnectionPage';
import ReadyPage from '@app/pages/participant/step4/ready/ReadyPage';
import ViewPage from '@app/pages/participant/step4/view/ViewPage';
import ViewCompletePage from '@app/pages/participant/step4/complete/CompletePage';
import CompletePage from '@app/pages/participant/step5/complete/CompletePage';
import SurveyPage from '@app/pages/participant/step5/survey/SurveyPage';
import DashboardPage from '@app/pages/marketer/dashboard/DashboardPage';
import { paths } from '@app/routes/path';

const router = createBrowserRouter([
  {
    path: paths.start,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <StartPage />,
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
        element: <ViewCompletePage />,
      },
      {
        path: paths.step5.survey,
        element: <SurveyPage />,
      },
      {
        path: paths.step5.complete,
        element: <CompletePage />,
      },
      {
        path: paths.dashboard,
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
