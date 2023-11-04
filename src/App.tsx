import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './pages/catalog/catalog';
import RootLayout from './layouts/root-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Main type={'character'} />,
      },
      {
        path: 'characters',
        element: <Main type={'character'} />,
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
