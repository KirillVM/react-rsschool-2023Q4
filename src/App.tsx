import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Catalog from './pages/catalog/catalog';
import RootLayout from './layouts/root-layout';
import ErrorPage from './pages/error/error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
    element: <RootLayout />,
    children: [
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

const App = (): JSX.Element => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
