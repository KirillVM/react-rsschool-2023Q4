import { ReactNode } from 'react';
import { RickAndMortyResponseResult } from '../../types/ram-types';
import Data from './data/data';
import './data-list.css';

type DataListProps = {
  responseResults: RickAndMortyResponseResult[];
  onClickDataHandler: (id: number) => void;
};
const DataList = ({
  responseResults,
  onClickDataHandler,
}: DataListProps): JSX.Element => {
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
