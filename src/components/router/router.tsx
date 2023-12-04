import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary';
import RootLayout from '@src/layouts/root-layout';
import MainPage from '@src/pages/main/main-page';
import UncontrolledForm from '../forms/u-form/u-form';
import HookForm from '../forms/rhf-form/hook-form';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <RootLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'u-form',
        element: <UncontrolledForm />,
      },
      {
        path: 'rhf-form',
        element: <HookForm />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <ErrorBoundary>
        <RootLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '*',
        element: <p>Error(404)</p>,
      },
    ],
  },
]);

export default router;
