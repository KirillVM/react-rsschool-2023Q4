import { useState } from 'react';
import { RickAndMortyResponseResult } from '../../../types/ram-interfaces';
import './data.css';

type DataProps = {
  responseResult: RickAndMortyResponseResult;
};

type CardData = {
  imageUrl: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
};

function getPartialResponse(
  responseResult: RickAndMortyResponseResult
): CardData {
  const partialResData: CardData = {
    imageUrl: responseResult.image,
    name: responseResult.name,
    status: responseResult.status,
    species: responseResult.species,
    type: responseResult.type ? responseResult.type : 'none',
    gender: responseResult.gender,
  };
  return partialResData;
}

const Data = ({ responseResult }: DataProps): JSX.Element => {
  const [cardData] = useState<CardData>(getPartialResponse(responseResult));
  return (
    <div className="data-wrapper">
      <img src={cardData.imageUrl} alt="img" className={'character-img'} />
      <ul>
        {Object.entries(cardData).map(
          (data: [string, string]): JSX.Element | '' => {
            return data[0] !== 'imageUrl' ? (
              <li key={`${data[0]}${data[1]}`}>
                {`${data[0].charAt(0).toUpperCase() + data[0].slice(1)}: ${
                  data[1]
                }`}
              </li>
            ) : (
              ''
            );
          }
        )}
      </ul>
    </div>
  );
};

export default Data;
