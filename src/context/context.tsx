import {
  RickAndMortyResponse,
  RickAndMortyResponseResult,
  RickAndMortyResponseinfo,
} from '@custom-types/ram-types';
import { createContext } from 'react';

interface ICatalogContext {
  searchParams: string;
  cardData: RickAndMortyResponse | null;
}

const initialCardData: RickAndMortyResponse = {
  info: {} as RickAndMortyResponseinfo,
  results: [] as RickAndMortyResponseResult[],
};

export const CatalogContext = createContext<ICatalogContext>({
  searchParams: localStorage.getItem('lastSearchRow') || '',
  cardData: initialCardData as RickAndMortyResponse | null,
});
