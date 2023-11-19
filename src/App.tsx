import router from '@components/router/router';
import './App.css';
import { RouterProvider } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
