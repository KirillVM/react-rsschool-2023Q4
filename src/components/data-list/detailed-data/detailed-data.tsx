import { CardData } from '../../../types/ram-types';
import './detailed-data.css';
import { getCardDataFromResponse } from '../../../utils/get-narrow-data';
import { useEffect } from 'react';
import { getCharactersById, getRunningQueriesThunk, useGetCharactersByIdQuery } from '@src/app/ramApi/ram-api';
import { useAppDispatch, useAppSelector } from '@src/app/hooks/hooks';
import {
  setDetailedCardData,
  setIsLoadingDetailed,
} from '@src/app/redusers/catalog-slice';
import Loader from '@src/components/loader/loader';
import { useRouter } from 'next/router';
import { AppStore, wrapper } from '@src/app/store/store';

type DetailedDataProps = {
  idDetailed: number;
};

const DetailedData = ({ idDetailed }: DetailedDataProps): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isError } = useGetCharactersByIdQuery(
    idDetailed.toString()
  );

  useEffect(() => {
    dispatch(setIsLoadingDetailed(isLoading));
  }, [isLoading]);
  useEffect(() => {
    data && dispatch(setDetailedCardData(getCardDataFromResponse(data)));
    router.push(`?id=${idDetailed}`, undefined, { shallow: true });
  }, [data]);

  const detailedCardData: CardData = useAppSelector(
    (state) => state.catalog.detailedData
  );
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


export const getServerSideProps = wrapper.getServerSideProps(
  (store: AppStore) => async (context) => {
    const id = context.params?.id;
    if (typeof id === "string"){
      store.dispatch(getCharactersById.initiate(id))
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    }
  }
)