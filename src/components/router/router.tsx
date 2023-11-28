import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Main + Error Boundary</p>,
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
    element: <p>Main + Error Boundary</p>,
    children: [
      {
        path: '*',
        element: <p>Error(404)</p>,
      },
    ],
  },
]);

export default router;
