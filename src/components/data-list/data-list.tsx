import { ReactNode, useEffect } from 'react';
import { RickAndMortyResponseResult } from '../../types/ram-types';
import Data from './data/data';
import './data-list.css';
import sliceSearchData from '@utils/slice-search-data';
import { useAppDispatch, useAppSelector } from '@src/app/hooks/hooks';
import { useGetCharactersQuery } from '@src/app/ramApi/ram-api';
import {
  setCardData,
  setIsLoadingCatalog,
} from '@src/app/redusers/catalog-slice';
import Loader from '../loader/loader';

type DataListProps = {
  onClickDataHandler: (id: number) => void;
};

const DataList = ({ onClickDataHandler }: DataListProps): JSX.Element => {
  const searchParams = useAppSelector((state) => state.catalog.searchParams);
  const currentPage = useAppSelector((state) => state.catalog.pageNumber);
  const itemPerPage = useAppSelector((state) => state.catalog.itemPerPage);

  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching, isError } = useGetCharactersQuery({
    itemName: searchParams,
    page: currentPage.toString(),
  });
  useEffect(() => {
    dispatch(setIsLoadingCatalog(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    data && dispatch(setCardData(data));
  }, [data, dispatch]);
  const cardData = useAppSelector((state) => state.catalog.data);
  const responseResults = sliceSearchData(
    cardData?.results,
    currentPage,
    itemPerPage
  );
  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : !isError ? (
        <div className={'data-list-wrapper'}>
          {responseResults.map(
            (element: RickAndMortyResponseResult, i: number): ReactNode => {
              return (
                <Data
                  key={`${i}${element.name}`}
                  id={element.id}
                  name={element.name}
                  image={element.image}
                  onClickDataHandler={onClickDataHandler}
                />
              );
            }
          )}
        </div>
      ) : (
        <p style={{ fontSize: '2rem' }}>
          NO DATA. PLEASE INSERT ANOTHER SEARCH PARAMETHER
        </p>
      )}
    </>
  );
};

export default DataList;
