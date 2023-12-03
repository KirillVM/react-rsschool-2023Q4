import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SearchForm from '@components/search-form/search-form';
import DataList from '@components/data-list/data-list';
import Button from '@components/button/button';
import DetailedData from '@components/data-list/detailed-data/detailed-data';
import { useRouter } from 'next/router';
import Pagination from '@components/pagination/pagination';

import './catalog.css';
import { useAppSelector } from '@src/app/hooks/hooks';

const Characters = (): JSX.Element => {
  const searchParams = useAppSelector((state) => state.catalog.searchParams);
  const currentPage = useAppSelector((state) => state.catalog.pageNumber);
  const router = useRouter();

  const handleParamsUpdate = () => {
    router.push(`?name=${searchParams}&page=${currentPage}`, undefined, { shallow: true });
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
          <Pagination />
        </div>
        <SearchForm />
        <DataList onClickDataHandler={onClickCardHandler} />
      </div>
      <div
        data-testid="catalog-detailed"
        ref={refCatalogDetailed}
        className="catalog-detailed "
      >
        {idDetailed ? (
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

export default Characters;
