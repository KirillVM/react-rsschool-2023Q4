import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@src/constants/constants';
import { HYDRATE } from 'next-redux-wrapper';
import {
  RickAndMortyResponse,
  RickAndMortyResponseResult,
} from '@src/types/ram-types';

export const ramApi = createApi({
  reducerPath: 'ramApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    getCharacters: build.query<RickAndMortyResponse, Record<string, string>>({
      query: ({ itemName = '', page = '1' }) =>
        `character?name=${itemName}&page=${page}`,
    }),
    getCharactersById: build.query<RickAndMortyResponseResult, string>({
      query: (id = '1') => `/character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharactersByIdQuery, util: { getRunningQueriesThunk }} = ramApi;

export const { getCharacters, getCharactersById } = ramApi.endpoints;