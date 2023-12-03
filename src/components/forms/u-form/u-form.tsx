import { SyntheticEvent, useRef } from 'react';
import './u-form.css';
import AutoInput from '@src/components/autocomplete-input/autocomplete-input';
import { useAppDispatch, useAppSelector } from '@src/app/hooks/hooks';
import { FormState, Gender } from '../form-interfaces';
import { setFormData } from '@src/app/reducers/form-slice';

const UncontrolledForm = (): JSX.Element => {
  const selectedCountry = useAppSelector((state) => state.form.selectedCountry);
  const countries = useAppSelector((state) => state.form.countries);
  const dataTest = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputConfirmPassword = useRef<HTMLInputElement>(null);
  const selectGender = useRef<HTMLSelectElement>(null);
  const inputAcceptTC = useRef<HTMLInputElement>(null);
  const inputAvatar = useRef<HTMLInputElement>(null);

  const handleFromSubmit = (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ): void => {
    e.preventDefault();
    console.log(e.target);
    const data: FormState = {
      name: inputName.current?.value,
      age: inputAge.current?.value,
      email: inputEmail.current?.value,
      password: inputPassword.current?.value,
      confirmPassword: inputConfirmPassword.current?.value,
      gender: selectGender.current?.value as Gender,
      acceptTC: !!inputAcceptTC.current?.value,
      avatar: inputAvatar.current?.value,
      country: selectedCountry,
    };
    dispatch(setFormData(data));
    console.log(data);
    console.log(dataTest);
  };

  // useEffect(() => {
  //   dispatch(setFormData(formData));
  // },[formData])
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

        <div>
          <label htmlFor="gender">Gender</label>
          <select
            defaultValue={'none'}
            name="gender"
            id="gender"
            ref={selectGender}
          >
            <option disabled hidden value="none">
              none
            </option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        <label
          htmlFor="accept-tc"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <input type="checkbox" ref={inputAcceptTC} id="accept-tc" />
          <p>Do you accept with T&C?</p>
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
