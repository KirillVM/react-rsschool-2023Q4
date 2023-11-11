import { createBrowserRouter } from 'react-router-dom';
import Catalog from '@pages/catalog/catalog';
import RootLayout from '@layouts/root-layout';
import ErrorPage from '@pages/error/error-page';
import ErrorBoundary from '@components/error-boundary/error-boundary';

const router = createBrowserRouter([
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
        element: <Catalog type={'character'} />,
      },
      {
        path: 'characters',
        element: <Catalog type={'character'} />,
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
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
