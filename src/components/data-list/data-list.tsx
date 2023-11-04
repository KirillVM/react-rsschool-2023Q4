import { ReactNode, useState } from 'react';
import {
  RickAndMortyResponse,
  RickAndMortyResponseResult,
} from '../../types/ram-types';
import Data from './data/data';
import './data-list.css';

type DataListProps = {
  response: RickAndMortyResponse;
};

const DataList = ({ response }: DataListProps): JSX.Element => {
  const [responseResults] = useState<RickAndMortyResponseResult[]>(
    response.results
  );

  return (
    <div className={'data-list-wrapper'}>
      {responseResults.map(
        (element: RickAndMortyResponseResult, i: number): ReactNode => {
          return <Data key={`${i}${element.name}`} responseResult={element} />;
        }
      )}
    </div>
  );
};

export default DataList;
