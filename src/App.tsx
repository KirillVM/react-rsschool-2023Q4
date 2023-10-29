import { Component, ReactNode, SyntheticEvent } from 'react';
import './App.css';
import SearchForm from './components/search-form/search-form';
import { RickAndMortyResponse } from './types/ram-interfaces';

type AppState = {
  searchData: RickAndMortyResponse | null;
};

export default class App extends Component<Readonly<object>, AppState> {
  constructor(props: Readonly<object>) {
    super(props);
    this.state = {
      searchData: null,
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }
  handleSearchSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const getResponse = await fetch(
      'https://rickandmortyapi.com/api/character',
      {
        method: 'GET',
      }
    );
    this.setState({ searchData: await getResponse.json() });
    console.log(this.state);
  };

  render(): ReactNode {
    return (
      <>
        <SearchForm value={'search'} handleSubmit={this.handleSearchSubmit} />
      </>
    );
  }
}
