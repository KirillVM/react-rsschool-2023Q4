import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './catalog.css';
import { RickAndMortyResponse } from '../../types/ram-types';
import SearchForm from '../../components/search-form/search-form';
import Loader from '../../components/loader/loader';
import DataList from '../../components/data-list/data-list';
import Button from '../../components/button/button';
import DetailedData from '../../components/data-list/detailed-data/detailed-data';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';

const BASE_URL = 'https://rickandmortyapi.com/api';

type CatalogProps = {
  type: string;
};

const Catalog = ({ type }: CatalogProps): JSX.Element => {
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const currentQueryParams = new URLSearchParams(location.search);

  const handleParamsUpdate = (): void => {
    currentQueryParams.set('name', searchParams);
    console.log(currentQueryParams);
    const newSearch: string = `?${currentQueryParams}`;
    navigate({ search: newSearch });
  };

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<string>(
    localStorage.getItem('lastSearchRow') || ''
  );
  const [searchData, setSearchData] = useState<RickAndMortyResponse | null>(
    null
  );
  const [nameDetailed, setNameDetailed] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const refCatalogDetailed = useRef<HTMLDivElement>(null);

  if (isError) {
    throw new Error('My Error');
  }

  const errorThrow = (): void => {
    setIsError(true);
  };

  const getData = async (
    name: string,
    page: number = currentPage
  ): Promise<void> => {
    setIsLoading(true);
    setTimeout(async (): Promise<void> => {
      const getResponse = await fetch(
        `${BASE_URL}/${type}/?page=${page}&name=${name}`,
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

  const handleDetailedCardClose = (event: Event): void => {
    console.log(handleDetailedCardClose);
    if (
      refCatalogDetailed.current &&
      !refCatalogDetailed.current.contains(event.target as Node)
    ) {
      refCatalogDetailed.current.setAttribute('style', 'display: none');
      document.removeEventListener('mousedown', handleDetailedCardClose);
      setNameDetailed('');
    }
  };

  const setPageHandler = (num: number): void => {
    setCurrentPage(currentPage + num);
  };

  const onClickCardHandler = (name: string): void => {
    console.log('click');
    if (!nameDetailed) {
      document.addEventListener('mousedown', handleDetailedCardClose);
    }
    setNameDetailed(name);
    refCatalogDetailed.current?.setAttribute('style', 'display: flex');
  };

  useEffect((): void => {
    setNameDetailed('');
    handleParamsUpdate();
    setCurrentPage(1);
  }, [searchParams]);
  useLayoutEffect((): void => {
    handleParamsUpdate();
    getData(searchParams, currentPage);
  }, [searchParams, currentPage]);
  return (
    <>
      <div className="catalog-list">
        <div>
          <Button
            className={['error-button']}
            text={'errorThrow'}
            type={'button'}
            callBack={errorThrow}
          />
          <Pagination
            responseInfo={searchData?.info}
            currentPage={currentPage}
            setPageHandler={setPageHandler}
          />
        </div>
        <SearchForm submitHandler={getData} />
        {isLoading ? (
          <Loader />
        ) : searchData ? (
          <DataList
            response={searchData}
            onClickDataHandler={onClickCardHandler}
          />
        ) : (
          <p style={{ fontSize: '2rem' }}>
            NO DATA. PLEASE INSERT ANOTHER SEARCH PARAMETHER
          </p>
        )}
      </div>
      <div ref={refCatalogDetailed} className="catalog-detailed">
        {isLoading ? (
          <Loader />
        ) : searchData && nameDetailed ? (
          <DetailedData
            responseResult={
              searchData.results.filter(
                (element) => element.name === nameDetailed
              )[0]
            }
          />
        ) : (
          <p style={{ fontSize: '2rem' }}>
            NO DATA. PLEASE INSERT ANOTHER SEARCH PARAMETHER
          </p>
        )}
      </div>
    </>
  );
};

export default Catalog;
