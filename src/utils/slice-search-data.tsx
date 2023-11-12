import { RickAndMortyResponseResult } from '@src/types/ram-types';

export default function (
  searchResult: RickAndMortyResponseResult[],
  currentPage: number,
  itemPerPage: number
) {
  const BASE_ITEM_PER_PAGE = 20;
  if ((currentPage * itemPerPage) % BASE_ITEM_PER_PAGE != 0) {
    return searchResult.slice(
      ((currentPage * itemPerPage) % BASE_ITEM_PER_PAGE) - itemPerPage,
      (currentPage * itemPerPage) % BASE_ITEM_PER_PAGE
    );
  } else {
    return searchResult.slice(
      BASE_ITEM_PER_PAGE - itemPerPage,
      BASE_ITEM_PER_PAGE
    );
  }
}
