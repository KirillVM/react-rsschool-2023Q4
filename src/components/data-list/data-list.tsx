import { ReactNode } from 'react';
import { RickAndMortyResponseResult } from '../../types/ram-types';
import Data from './data/data';
import './data-list.css';
import sliceSearchData from '@utils/slice-search-data';
import { useAppSelector } from '@src/app/hooks/hooks';

type DataListProps = {
  onClickDataHandler: (id: number) => void;
};

const DataList = ({ onClickDataHandler }: DataListProps): JSX.Element => {
  const cardData = useAppSelector((state) => state.catalog.data);
  const currentPage = useAppSelector((state) => state.catalog.pageNumber);
  const itemPerPage = useAppSelector((state) => state.catalog.itemPerPage);
  const responseResults = sliceSearchData(
    cardData?.results,
    currentPage,
    itemPerPage
  );
  return (
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
  );
};

export default DataList;
