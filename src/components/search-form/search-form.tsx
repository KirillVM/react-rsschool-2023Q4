import { SyntheticEvent, useState } from 'react';
import Button from '../button/button';
import './search-form.css';
import { useAppDispatch } from '@src/app/hooks/hooks';
import {
  setPageNumber,
  setSearchParams,
} from '@src/app/redusers/catalog-slice';

const SearchForm = (): JSX.Element => {
  const [value, setValue] = useState<string>(
    localStorage.getItem('lastSearchRow') || ''
  );
  const dispatch = useAppDispatch();

  const handleChange = (event: SyntheticEvent): void => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
  };

  const handleSubmitButtonClick = (): void => {
    localStorage.setItem('lastSearchRow', value);
    dispatch(setPageNumber(1));
    dispatch(setSearchParams(value));
  };

  return (
    <form className={'search-form'} onSubmit={handleSubmit}>
      <label>
        <p className={'search-label'}>Search:</p>
        <input
          className="search-input"
          placeholder="Search"
          type="text"
          value={value}
          onChange={handleChange}
        ></input>
      </label>
      <Button
        className={['search-button']}
        type={'submit'}
        text={'Search'}
        callBack={handleSubmitButtonClick}
      />
    </form>
  );
};

export default SearchForm;
