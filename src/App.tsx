import { Component, ReactNode, SyntheticEvent } from 'react';
import './App.css';
import SearchForm from './components/search-form/search-form';
import { RickAndMortyResponse } from './types/ram-interfaces';
import DataList from './components/data-list/data-list';

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
  handleSearchSubmit = async (event: SyntheticEvent, name: string) => {
    event.preventDefault();
    const getResponse = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${name}`,
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
        <hr></hr>
        {this.state.searchData ? (
          <DataList responce={this.state.searchData} />
        ) : (
          <p>NO DATA</p>
        )}
      </>
    );
  }
}
