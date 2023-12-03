import { NavLink } from 'react-router-dom';
import './main-page.css';
import { useAppSelector } from '@src/app/hooks/hooks';
import DataCard from '@src/components/data-card/data-card';

const MainPage = (): JSX.Element => {
  const formData = useAppSelector((state) => state.form.formStates);

  return (
    <>
      <div className="main-page">
        <NavLink to="u-form" className="link-button">
          Uncontrolled Form
        </NavLink>
        <NavLink to="rhf-form" className="link-button">
          RHF Form
        </NavLink>
        {formData.map((el, index) => (
          <div key={index}>
            <DataCard formData={el} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MainPage;
