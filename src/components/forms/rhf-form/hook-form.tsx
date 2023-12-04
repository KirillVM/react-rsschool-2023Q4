import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormState } from '../form-interfaces';
import './hook-form.css';
import { useAppDispatch, useAppSelector } from '@src/app/hooks/hooks';
import { setFormData } from '@src/app/reducers/form-slice';
import AutoInput from '@src/components/autocomplete-input/autocomplete-input';
import { ChangeEvent } from 'react';

function encodeImageFileAsURL(e: ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    console.log('RESULT', reader.result);
  };
  reader.readAsDataURL(file as File);
}

const HookForm = () => {
  const methods = useForm<FormState>();
  const { register, handleSubmit /*formState: {errors}*/ } = methods;
  const countries = useAppSelector((state) => state.form.countries);
  const formData = useAppSelector((store) => store.form);
  const dispatch = useAppDispatch();
  const formSubmit: SubmitHandler<FormState> = (data) => {
    dispatch(setFormData(data));
    console.log(data.country);
    console.log(formData);
  };
  return (
    <>
      <FormProvider {...methods}>
        <form className="u-form" onSubmit={handleSubmit(formSubmit)}>
          <h1>Registration</h1>

          <label htmlFor="name">
            Name
            <input
              {...register('name', {
                required: true,
              })}
              type="text"
              id="name"
              placeholder="Name..."
            />
            {/* {errors?.name && <p style={{color: 'red'}}>{errors.name.message}</p>} */}
          </label>

          <label htmlFor="age">
            Age
            <input
              {...register('age', {
                required: true,
              })}
              type="text"
              id="age"
              placeholder="Age..."
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              {...register('email', {
                required: true,
              })}
              type="text"
              id="email"
              placeholder="Email..."
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              {...register('password', {
                required: true,
              })}
              type="text"
              id="password"
              placeholder="Password..."
            />
          </label>

          <label htmlFor="password-confirm">
            Confirm password
            <input
              {...register('confirmPassword', {
                required: true,
              })}
              type="text"
              id="password-confirm"
              placeholder="Confirm password..."
              onChange={encodeImageFileAsURL}
            />
          </label>

          <div>
            <label htmlFor="gender">Gender</label>
            <select
              {...register('gender', {
                required: true,
              })}
              defaultValue={'none'}
              name="gender"
              id="gender"
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
            <input
              {...register('acceptTC', {
                required: true,
              })}
              type="checkbox"
              id="accept-tc"
            />
            <p>Do you accept with T&C?</p>
          </label>

          <label htmlFor="avatar">
            Add avatar:
            <input
              {...register('avatar', {
                required: true,
              })}
              type="file"
              accept="image/png, image/jpeg"
              id="avatar"
            />
          </label>

          <AutoInput countries={countries} />

          <button className="search-button" type="submit" value="Submit">
            Submit
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default HookForm;
