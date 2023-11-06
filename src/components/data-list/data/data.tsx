import { RickAndMortyResponseResult } from '../../../types/ram-types';
import './data.css';
import { SyntheticEvent, useRef } from 'react';

type DataProps = {
  responseResult: RickAndMortyResponseResult;
  onClickDataHandler: (id: number) => void;
};

const Data = ({
  responseResult,
  onClickDataHandler,
}: DataProps): JSX.Element => {
  const handleCardClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    onClickDataHandler(responseResult.id);
  };
  const refCard = useRef<HTMLDivElement>(null);
  const name = responseResult.name;
  return (
    <div className="data-wrapper" ref={refCard} onClick={handleCardClick}>
      <img src={responseResult.image} alt="img" className={'character-img'} />
      <ul>
        <li key={`name${name}`}>{`${name}`}</li>
      </ul>
    </div>
  );
};

export default Data;
