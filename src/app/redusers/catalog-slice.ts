import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { cardData } from '@src/types/card-data';
import { CardData, RickAndMortyResponse } from '@src/types/ram-types';
import { getCardDataFromResponse } from '@src/utils/get-narrow-data';

interface CatalogState {
  data: RickAndMortyResponse;
  detailedData: CardData;
  searchParams: string;
  pageNumber: number;
  itemPerPage: number;
}

const initialState: CatalogState = {
  data: cardData,
  detailedData: getCardDataFromResponse(cardData.results[1]),
  searchParams: localStorage.getItem('lastSearchRow') || '',
  pageNumber: 1,
  itemPerPage: 20,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCardData(state, action: PayloadAction<RickAndMortyResponse>) {
      state.data = action.payload;
    },
    incPageNumber(state) {
      state.pageNumber = state.pageNumber + 1;
    },
    decPageNumber(state) {
      state.pageNumber = state.pageNumber - 1;
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setSearchParams(state, action: PayloadAction<string>) {
      state.searchParams = action.payload;
    },
    setItemPerPage(state, action: PayloadAction<number>) {
      state.itemPerPage = action.payload;
    },
    setDetailedCardData(state, action: PayloadAction<CardData>) {
      state.detailedData = action.payload;
    },
  },
});

export const {
  setCardData,
  incPageNumber,
  decPageNumber,
  setPageNumber,
  setSearchParams,
  setItemPerPage,
  setDetailedCardData,
} = catalogSlice.actions;
export default catalogSlice.reducer;
