import { ReactNode } from 'react';
import {
  RickAndMortyResponse,
  RickAndMortyResponseResult,
} from '../../types/ram-types';
import Data from './data/data';
import './data-list.css';

type DataListProps = {
  response: RickAndMortyResponse;
  onClickDataHandler: (name: string) => void;
};

const DataList = ({
  response,
  onClickDataHandler,
}: DataListProps): JSX.Element => {
  return (
    <div className={'data-list-wrapper'}>
      {response.results.map(
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
