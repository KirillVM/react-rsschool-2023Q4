import { NavLink } from 'react-router-dom';
import './main-page.css';

const MainPage = (): JSX.Element => {
  return (
    <>
      <div className="main-page">
        <NavLink to="u-form">Uncontrolled Form</NavLink>
        <NavLink to="rhf-form">RHF Form</NavLink>
      </div>
    </>
  );
};

export default MainPage;
