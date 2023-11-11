import { CardData, RickAndMortyResponseResult } from '../../../types/ram-types';
import './detailed-data.css';
import { getCardDataFromResponse } from '../../../utils/get-narrow-data';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CatalogContext } from 'src/context/context';

type DetailedDataProps = {
  idDetailed: number;
};

const DetailedData = ({ idDetailed }: DetailedDataProps): JSX.Element => {
  const { cardData } = useContext(CatalogContext);
  const responseResult = cardData?.results.find(
    (element) => element.id === idDetailed
  ) as RickAndMortyResponseResult;
  const detailedCardData: CardData = getCardDataFromResponse(responseResult);
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const currentQueryParams = new URLSearchParams(location.search);

  const handleParamsUpdate = (): void => {
    currentQueryParams.set('id', responseResult.id.toString());
    console.log(currentQueryParams);
    const newSearch: string = `?${currentQueryParams}`;
    navigate({ search: newSearch });
  };

  useEffect((): void => {
    handleParamsUpdate();
  }, []);

  return (
    <div className="detailed-data-wrapper">
      <img
        src={detailedCardData.imageUrl}
        alt="img"
        className={'character-img'}
      />
      <ul>
        {Object.entries(detailedCardData).map(
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
