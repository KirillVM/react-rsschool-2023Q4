import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@src/constants/constants';
import { RickAndMortyResponse } from '@src/types/ram-types';

export const ramApi = createApi({
  reducerPath: 'ramApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCharacters: build.query<RickAndMortyResponse, Record<string, string>>({
      query: ({ itemName = '', page = '1' }) =>
        `character?name=${itemName}&page=${page}`,
    }),
  }),
});

export const { useGetCharactersQuery } = ramApi;
