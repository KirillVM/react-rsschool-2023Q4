import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@src/constants/constants';

export const ramApi = createApi({
  reducerPath: 'ramApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCharacters: build.query({
      query: () => 'character',
    }),
  }),
});

export const { useGetCharactersQuery } = ramApi;
