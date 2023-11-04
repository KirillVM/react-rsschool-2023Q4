import { useLayoutEffect, useState } from 'react';
import './catalog.css';
import { RickAndMortyResponse } from '../../types/ram-types';
import SearchForm from '../../components/search-form/search-form';
import Loader from '../../components/loader/loader';
import DataList from '../../components/data-list/data-list';

type MainProps = {
  type: string;
};

const Main = ({ type }: MainProps): JSX.Element => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<string>(
    localStorage.getItem('lastSearchRow') || ''
  );
  const [searchData, setSearchData] = useState<RickAndMortyResponse | null>(
    null
  );

  if (isError) {
    throw new Error('My Error');
  }

  const errorThrow = (): void => {
    setIsError(true);
  };

  const getData = async (name: string): Promise<void> => {
    setIsLoading(true);
    setTimeout(async (): Promise<void> => {
      const getResponse = await fetch(
        `https://rickandmortyapi.com/api/${type}/?name=${name}`,
        {
          method: 'GET',
        }
      ).catch((error: Error): void => console.log(error));
      if (getResponse && getResponse.status === 200) {
        setSearchParams(name);
        setSearchData(await getResponse.json());
        setIsLoading(false);
      } else {
        setSearchData(null);
        setIsLoading(false);
      }
    }, 3000);
  };

  useLayoutEffect((): void => {
    getData(searchParams);
  });

  return (
    <>
      <SearchForm submitHandler={getData} />
      {isLoading ? (
        <Loader />
      ) : searchData ? (
        <DataList response={searchData} />
      ) : (
        <p style={{ fontSize: '2rem' }}>
          NO DATA. PLEASE INSERT ANOTHER SEARCH PARAMETHER
        </p>
      )}
      <button className={'error-button'} onClick={errorThrow}>
        ThrowError
      </button>
    </>
  );
};

export default Main;
