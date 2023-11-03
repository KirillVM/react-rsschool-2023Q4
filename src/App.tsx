import { useEffect, useState } from 'react';
import './App.css';
import SearchForm from './components/search-form/search-form';
import { RickAndMortyResponse } from './types/ram-interfaces';
import DataList from './components/data-list/data-list';
import Loader from './components/loader/loader';

const App = (): JSX.Element => {
  const [isErrorS, setIsErrorS] = useState<boolean>(false);
  const [isLoadingS, setIsLoadingS] = useState<boolean>(false);
  const [searchParamsS, setSearchParamsSS] = useState<string>(
    localStorage.getItem('lastSearchRow') || ''
  );
  const [searchDataS, setSearchDataS] = useState<RickAndMortyResponse | null>(
    null
  );

  if (isErrorS) {
    throw new Error('My Error');
  }

  const errorThrow = (): void => {
    setIsErrorS(true);
  };

  const getData = async (name: string): Promise<void> => {
    setIsLoadingS(true);
    setTimeout(async (): Promise<void> => {
      const getResponse = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}`,
        {
          method: 'GET',
        }
      ).catch((error: Error): void => console.log(error));
      if (getResponse && getResponse.status === 200) {
        setSearchParamsSS(name);
        setSearchDataS(await getResponse.json());
        setIsLoadingS(false);
      } else {
        setSearchDataS(null);
        setIsLoadingS(false);
      }
    }, 3000);
  };

  useEffect(() => {
    getData(searchParamsS);
  }, [searchParamsS]);

  return (
    <>
      <SearchForm value={'search'} handleSubmit={getData} />
      <button className={'error-button'} onClick={errorThrow}>
        ThrowError
      </button>
      <hr></hr>
      {isLoadingS ? (
        <Loader />
      ) : searchDataS ? (
        <DataList response={searchDataS} />
      ) : (
        <p style={{ fontSize: '2rem' }}>
          NO DATA. PLEASE INSERT ANOTHER SEARCH PARAMETHER
        </p>
      )}
    </>
  );
};

export default App;
