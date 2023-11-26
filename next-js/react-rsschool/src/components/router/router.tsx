import { createBrowserRouter } from 'react-router-dom';
import Characters from '@src/pages/catalog/characters';
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
        element: <Characters />,
      },
      {
        path: 'characters',
        element: <Characters />,
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
