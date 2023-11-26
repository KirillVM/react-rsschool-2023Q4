import { CardData } from '../../../types/ram-types';
import './detailed-data.css';
import { getCardDataFromResponse } from '../../../utils/get-narrow-data';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetCharactersByIdQuery } from '@src/app/ramApi/ram-api';
import { useAppDispatch, useAppSelector } from '@src/app/hooks/hooks';
import {
  setDetailedCardData,
  setIsLoadingDetailed,
} from '@src/app/redusers/catalog-slice';
import Loader from '@src/components/loader/loader';

type DetailedDataProps = {
  idDetailed: number;
};

const DetailedData = ({ idDetailed }: DetailedDataProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isError } = useGetCharactersByIdQuery(
    idDetailed.toString()
  );

  useEffect(() => {
    dispatch(setIsLoadingDetailed(isLoading));
  }, [isLoading, dispatch]);
  useEffect(() => {
    data && dispatch(setDetailedCardData(getCardDataFromResponse(data)));
  }, [data]);

  const detailedCardData: CardData = useAppSelector(
    (state) => state.catalog.detailedData
  );

  // const location = useLocation();
  // const navigate: NavigateFunction = useNavigate();
  // const currentQueryParams = new URLSearchParams(location.search);

  // const handleParamsUpdate = (): void => {
  //   currentQueryParams.set('id', idDetailed.toString());
  //   const newSearch: string = `?${currentQueryParams}`;
  //   navigate({ search: newSearch });
  // };

  // useEffect((): void => {
  //   handleParamsUpdate();
  // }, []);

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : !isError ? (
        <div data-testid="detailed-card" className="detailed-data-wrapper">
          <img
            src={detailedCardData.imageUrl}
            alt="img"
            className={'character-img'}
          />
          <ul>
            {Object.entries(detailedCardData).map(
              (data: [string, string]): JSX.Element | '' => {
                return data[0] !== 'imageUrl' ? (
                  <li
                    data-testid="detailed-card-name"
                    key={`${data[0]}${data[1]}`}
                  >
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
      ) : (
        <p style={{ fontSize: '2rem' }}>
          NO DATA. PLEASE INSERT ANOTHER SEARCH PARAMETHER
        </p>
      )}
    </>
  );
};

export default DetailedData;
