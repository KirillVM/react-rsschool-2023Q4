import { CardData, RickAndMortyResponseResult } from '../../../types/ram-types';
import './detailed-data.css';
import { getCardDataFromResponse } from '../../../utils/get-narrow-data';

type DetailedDataProps = {
  responseResult: RickAndMortyResponseResult;
};

const DetailedData = ({ responseResult }: DetailedDataProps): JSX.Element => {
  const cardData: CardData = getCardDataFromResponse(responseResult);
  return (
    <div className="detailed-data-wrapper">
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

export default DetailedData;
