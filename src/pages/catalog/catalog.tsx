import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RickAndMortyResponse } from '@custom-types/ram-types';
import SearchForm from '@components/search-form/search-form';
import Loader from '@components/loader/loader';
import DataList from '@components/data-list/data-list';
import Button from '@components/button/button';
import DetailedData from '@components/data-list/detailed-data/detailed-data';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@components/pagination/pagination';
import { CatalogContext } from '@src/context/context';

import './catalog.css';
import { getResponse } from '@src/utils/get-response';

const BASE_ITEM_PER_PAGE = 20;

type CatalogProps = {
  type: string;
};

const Catalog = ({ type }: CatalogProps): JSX.Element => {
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const currentQueryParams = new URLSearchParams(location.search);
  // const page: string | null = currentQueryParams.get('page');
  // const name: string | null = currentQueryParams.get('name');

  const handleParamsUpdate = (): void => {
    currentQueryParams.set('name', searchParams);
    currentQueryParams.set('page', currentPage.toString());
    const newSearch: string = `?${currentQueryParams}`;
    navigate({ search: newSearch });
  };

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<string>(
    localStorage.getItem('lastSearchRow') || ''
  );
  const [cardData, setCardData] = useState<RickAndMortyResponse | null>(null);
  const [idDetailed, setIdDetailed] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(20);

  const refCatalogDetailed = useRef<HTMLDivElement>(null);

  if (isError) {
    throw new Error('My Error');
  }

  const errorThrow = (): void => {
    setIsError(true);
  };

  const getData = async (
    name: string,
    page: number = Math.ceil((currentPage * itemPerPage) / BASE_ITEM_PER_PAGE)
  ): Promise<void> => {
    setIsLoading(true);
    const response: Response | void = await getResponse(type, page, name);
    if (response && response.status === 200) {
      setSearchParams(name);
      setCardData(await response.json());
      setIsLoading(false);
    } else {
      setCardData(null);
      setIsLoading(false);
    }
  };

  const handleDetailedCardClose = (event: Event): void => {
    if (
      refCatalogDetailed.current &&
      !refCatalogDetailed.current.contains(event.target as Node)
    ) {
      refCatalogDetailed.current.classList.remove('visible');
      document.removeEventListener('mousedown', handleDetailedCardClose);
      setIdDetailed(0);
      handleParamsUpdate();
    }
  };

  const handleDetailedCardCloseButton = (): void => {
    refCatalogDetailed.current?.classList.remove('visible');
    document.removeEventListener('mousedown', handleDetailedCardClose);
    setIdDetailed(0);
    handleParamsUpdate();
  };
  const setPageHandler = (num: number): void => {
    num ? setCurrentPage(currentPage + num) : setCurrentPage(1);
  };

  const onClickCardHandler = (id: number): void => {
    if (!idDetailed) {
      document.addEventListener('mousedown', handleDetailedCardClose);
    }
    setIdDetailed(id);
    refCatalogDetailed.current?.classList.add('visible');
  };

  // useEffect((): void => {
  //   if (page) setCurrentPage(+page);
  //   if (name) setSearchParams(name);
  // }, [page,name]);

  useEffect((): void => {
    setIdDetailed(0);
    handleParamsUpdate();
    setCurrentPage(1);
  }, [searchParams]);

  useLayoutEffect((): void => {
    handleParamsUpdate();
    getData(
      searchParams,
      Math.ceil((currentPage * itemPerPage) / BASE_ITEM_PER_PAGE)
    );
  }, [searchParams, currentPage, itemPerPage]);
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
          <CatalogContext.Provider value={{ searchParams, cardData }}>
            <Pagination
              currentPage={currentPage}
              setPageHandler={setPageHandler}
              setItemPerPageHandler={(count: number): void =>
                setItemPerPage(count)
              }
            />
          </CatalogContext.Provider>
        </div>
        <SearchForm submitHandler={getData} />
        {isLoading ? (
          <Loader />
        ) : cardData ? (
          <CatalogContext.Provider value={{ searchParams, cardData }}>
            <DataList
              currentPage={currentPage}
              itemPerPage={itemPerPage}
              onClickDataHandler={onClickCardHandler}
            />
          </CatalogContext.Provider>
        ) : (
          <p style={{ fontSize: '2rem' }}>
            NO DATA. PLEASE INSERT ANOTHER SEARCH PARAMETHER
          </p>
        )}
      </div>
      <div
        data-testid="catalog-detailed"
        ref={refCatalogDetailed}
        className="catalog-detailed "
      >
        {isLoading ? (
          <Loader />
        ) : cardData && idDetailed ? (
          <>
            <Button
              dataTestid="close-card"
              className={['close-detailed-button']}
              text="X"
              callBack={handleDetailedCardCloseButton}
            />
            <CatalogContext.Provider value={{ searchParams, cardData }}>
              <DetailedData idDetailed={idDetailed} />
            </CatalogContext.Provider>
          </>
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
