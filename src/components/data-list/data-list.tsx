import { ReactNode, useContext } from 'react';
import { RickAndMortyResponseResult } from '../../types/ram-types';
import Data from './data/data';
import './data-list.css';
import { CatalogContext } from 'src/context/context';
import sliceSearchData from '@utils/slice-search-data';

type DataListProps = {
  currentPage: number;
  itemPerPage: number;
  onClickDataHandler: (id: number) => void;
};

const DataList = ({
  currentPage,
  itemPerPage,
  onClickDataHandler,
}: DataListProps): JSX.Element => {
  const { cardData } = useContext(CatalogContext);
  const responseResults = sliceSearchData(
    cardData?.results as RickAndMortyResponseResult[],
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
              responseResult={element}
              onClickDataHandler={onClickDataHandler}
            />
          );
        }
      )}
    </div>
  );
};

export default DataList;
