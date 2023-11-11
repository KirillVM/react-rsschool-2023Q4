import { RickAndMortyResponse } from '@custom-types/ram-types';
import { Context, createContext } from 'react';

const BASE_URL = 'https://rickandmortyapi.com/api';

interface ICatalogContext {
  searchParams: string;
  cardData: RickAndMortyResponse | null;
}

const getCardData = async (): Promise<RickAndMortyResponse | null> => {
  const response = await fetch(
    `${BASE_URL}/${'charcter'}/?page=${1}&name=${
      localStorage.getItem('lastSearchRow') || ''
    }`,
    {
      method: 'GET',
    }
  ).catch((error: Error): void => console.log(error));
  return response?.json();
};

export const CatalogContext: Context<ICatalogContext> = createContext({
  searchParams: localStorage.getItem('lastSearchRow') || '',
  cardData: await getCardData(),
});
