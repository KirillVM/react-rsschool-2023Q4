import { SyntheticEvent, useState } from 'react';
import Button from '../button/button';
import './search-form.css';

type SearchProps = {
  handler: (name: string) => Promise<void>;
};

const SearchForm = ({ handler }: SearchProps): JSX.Element => {
  const [valueS, setValueS] = useState<string>(
    localStorage.getItem('lastSearchRow') || ''
  );

  const handleChange = (event: SyntheticEvent): void => {
    setValueS((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    localStorage.setItem('lastSearchRow', valueS);
    await handler(valueS);
  };

  return (
    <form className={'search-form'} onSubmit={handleSubmit}>
      <label>
        <p className={'search-label'}>Search:</p>
        <input
          placeholder="Search"
          type="text"
          value={valueS}
          onChange={handleChange}
        ></input>
      </label>
      <Button className={['search-button']} />
    </form>
  );
};

export default SearchForm;
