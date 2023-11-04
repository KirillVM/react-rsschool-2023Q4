import { SyntheticEvent, useState } from 'react';
import Button from '../button/button';
import './search-form.css';

type SearchProps = {
  submitHandler: (name: string) => Promise<void>;
};

const SearchForm = ({ submitHandler }: SearchProps): JSX.Element => {
  const [value, setValue] = useState<string>(
    localStorage.getItem('lastSearchRow') || ''
  );

  const handleChange = (event: SyntheticEvent): void => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    localStorage.setItem('lastSearchRow', value);
    await submitHandler(value);
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
      <Button className={['search-button']} type={'submit'} text={'Search'} />
    </form>
  );
};

export default SearchForm;
