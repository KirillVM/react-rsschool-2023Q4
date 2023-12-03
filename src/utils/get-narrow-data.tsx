import { CardData, RickAndMortyResponseResult } from '../types/ram-types';

export function getCardDataFromResponse(
  responseResult: RickAndMortyResponseResult
): CardData {
  const partialResData: CardData = {
    imageUrl: responseResult.image,
    name: responseResult.name,
    status: responseResult.status,
    species: responseResult.species,
    type: responseResult.type ? responseResult.type : 'none',
    gender: responseResult.gender,
  };
  return partialResData;
}
