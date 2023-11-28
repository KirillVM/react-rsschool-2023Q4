import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary';
import RootLayout from '@src/pages/root-layout';

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
        element: <p></p>,
      },
      {
        path: 'u-form',
        element: <p>u-form</p>,
      },
      {
        path: 'rhf-form',
        element: <p>rhf-form</p>,
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
