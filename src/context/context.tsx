import {
  RickAndMortyResponse,
  RickAndMortyResponseResult,
  RickAndMortyResponseinfo,
} from '@custom-types/ram-types';
import { createContext } from 'react';

interface ICatalogContext {
  searchParams: string;
  data: RickAndMortyResponse | undefined;
}

const initialCardData: RickAndMortyResponse = {
  info: {} as RickAndMortyResponseinfo,
  results: [] as RickAndMortyResponseResult[],
};

export const CatalogContext = createContext<ICatalogContext>({
  searchParams: /*localStorage.getItem('lastSearchRow') ||*/ '',
  data: initialCardData as RickAndMortyResponse | undefined,
});
