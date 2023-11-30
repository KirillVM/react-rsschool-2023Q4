import { SyntheticEvent, useRef } from 'react';
import './u-form.css';
import AutoInput from '@src/components/autocomplete-input/autocomplete-input';

const countries = ['Russia', 'USA', 'Ukraine', 'Germany', 'Poland'];

const UncontrolledForm = (): JSX.Element => {
  const inputName = useRef(null);
  const inputAge = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputConfirmPassword = useRef(null);
  const selectGender = useRef(null);
  const inputAcceptTC = useRef(null);
  const inputAvatar = useRef(null);
  // const selectCountry = useRef(null);

  const handleFromSubmit = (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ): void => {
    e.preventDefault();
    // const form: HTMLFormElement | null = document.querySelector('.u-form');
    // if (form) {
    //   const formData = new FormData(form);
    //   console.log(formData.get('name'));
    // }
  };
  return (
    <>
      <form className="u-form" onSubmit={handleFromSubmit}>
        <h1>Registration</h1>

        <label htmlFor="name">
          Name
          <input type="text" ref={inputName} id="name" placeholder="Name..." />
        </label>

        <label htmlFor="age">
          Age
          <input type="text" ref={inputAge} id="age" placeholder="Age..." />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="text"
            ref={inputEmail}
            id="email"
            placeholder="Email..."
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="text"
            ref={inputPassword}
            id="password"
            placeholder="Password..."
          />
        </label>

        <label htmlFor="password-confirm">
          Confirm password
          <input
            type="text"
            ref={inputConfirmPassword}
            id="password-confirm"
            placeholder="Confirm password..."
          />
        </label>

        <select name="gender" id="gender" ref={selectGender}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>

        <label htmlFor="acept-tc">
          Do you accept with T&C?
          <input type="checkbox" ref={inputAcceptTC} id="acept-tc" />
        </label>

        <label htmlFor="avatar">
          Add avatar:
          <input
            type="file"
            ref={inputAvatar}
            accept="image/png, image/jpeg"
            id="avatar"
          />
        </label>

        {/* <select name="country" id="country" ref={selectCountry}>
          <option value="Russia">Russia</option>
          <option value="Ukrain">Ukrain</option>
        </select> */}
        <AutoInput countries={countries} />
        <button
          className="search-button"
          type="submit"
          value="Submit"
          // onClick={handleSubmitButtonClick}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default UncontrolledForm;
