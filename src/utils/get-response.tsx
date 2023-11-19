export const getResponse = async (
  type: string,
  page: number,
  name: string
): Promise<Response | void> => {
  const BASE_URL = 'https://rickandmortyapi.com/api';
  return await fetch(`${BASE_URL}/${type}/?page=${page}&name=${name}`, {
    method: 'GET',
  }).catch((error: Error): void => console.log(error));
};
