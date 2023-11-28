import { SyntheticEvent } from 'react';
import './u-form.css';

const UncontrolledForm = (): JSX.Element => {
  const handleFromSubmit = (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ): void => {
    e.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('.u-form');
    if (form) {
      const formData = new FormData(form);
      console.log(formData);
    }
  };
  return (
    <>
      <form className="u-form" onSubmit={handleFromSubmit}>
        <h1>Registration</h1>
        <label htmlFor="name">
          Name
          <input type="text" id="name" placeholder="Name..." />
        </label>
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
