import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SearchForm from '@components/search-form/search-form';
import Loader from '@components/loader/loader';
import DataList from '@components/data-list/data-list';
import Button from '@components/button/button';
import DetailedData from '@components/data-list/detailed-data/detailed-data';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@components/pagination/pagination';

import './catalog.css';
import { useGetCharactersQuery } from '@src/app/ramApi/ram-api';
import { useAppDispatch, useAppSelector } from '@src/app/hooks/hooks';
import { setCardData } from '@src/app/redusers/catalog-slice';

const Catalog = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const searchParams = useAppSelector((state) => state.catalog.searchParams);
  const currentPage = useAppSelector((state) => state.catalog.pageNumber);
  const { data, isLoading, isFetching } = useGetCharactersQuery({
    itemName: searchParams,
    page: currentPage.toString(),
  });
  useEffect(() => {
    data && dispatch(setCardData(data));
  }, [data, dispatch]);
  const cardData = useAppSelector((state) => state.catalog.data);

  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const currentQueryParams = new URLSearchParams(location.search);

  const handleParamsUpdate = (): void => {
    currentQueryParams.set('name', searchParams);
    currentQueryParams.set('page', currentPage.toString());
    const newSearch: string = `?${currentQueryParams}`;
    navigate({ search: newSearch });
  };

  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    if (isError) {
      throw new Error('My Error');
    }
  }, [isError]);

  const [idDetailed, setIdDetailed] = useState<number>(0);

  const refCatalogDetailed = useRef<HTMLDivElement>(null);

  const errorThrow = (): void => {
    setIsError(true);
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

  const onClickCardHandler = (id: number): void => {
    if (!idDetailed) {
      document.addEventListener('mousedown', handleDetailedCardClose);
    }
    setIdDetailed(id);
    refCatalogDetailed.current?.classList.add('visible');
  };

  useEffect((): void => {
    setIdDetailed(0);
  }, [searchParams]);

  useLayoutEffect((): void => {
    handleParamsUpdate();
  }, [searchParams, currentPage, handleParamsUpdate]);

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
          <Pagination />
        </div>
        <SearchForm />
        {isLoading || isFetching ? (
          <Loader />
        ) : cardData ? (
          <DataList onClickDataHandler={onClickCardHandler} />
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
        {isLoading || isFetching ? (
          <Loader />
        ) : cardData && idDetailed ? (
          <>
            <Button
              dataTestid="close-card"
              className={['close-detailed-button']}
              text="X"
              callBack={handleDetailedCardCloseButton}
            />
            <DetailedData idDetailed={idDetailed} />
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
