import './data.css';
import { SyntheticEvent, useRef } from 'react';

type DataProps = {
  id: number;
  name: string;
  image: string;
  onClickDataHandler: (id: number) => void;
};

const Data = ({
  id,
  name,
  image,
  onClickDataHandler,
}: DataProps): JSX.Element => {
  const handleCardClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    onClickDataHandler(id);
  };
  const refCard = useRef<HTMLDivElement>(null);
  return (
    <div
      data-testid="card"
      className="data-wrapper"
      ref={refCard}
      onClick={handleCardClick}
    >
      <img src={image} alt="img" className={'character-img'} />
      <ul>
        <li key={`name${name}`}>{`${name}`}</li>
      </ul>
    </div>
  );
};

export default Data;
