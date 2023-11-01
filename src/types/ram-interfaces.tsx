export interface RickAndMortyResponse {
  info: RickAndMortyResponseinfo;
  results: RickAndMortyResponseResult[];
}

export interface RickAndMortyResponseinfo {
  count: number;
  page: number;
  next: string | null;
  prev: string | null;
}

export interface RickAndMortyResponseResult {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}
