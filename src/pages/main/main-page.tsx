import { NavLink } from 'react-router-dom';
import './main-page.css';

const MainPage = (): JSX.Element => {
  return (
    <>
      <div className="main-page">
        <NavLink to="u-form" className="link-button">
          Uncontrolled Form
        </NavLink>
        <NavLink to="rhf-form" className="link-button">
          RHF Form
        </NavLink>
      </div>
    </>
  );
};

export default MainPage;
