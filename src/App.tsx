import { Component, ReactNode } from 'react';
import './App.css';
import SearchForm from './components/search-form/search-form';
import { RickAndMortyResponse } from './types/ram-interfaces';
import DataList from './components/data-list/data-list';
import Loader from './components/loader/loader';

type AppState = {
  isLoading: boolean;
  searchParams: string;
  searchData: RickAndMortyResponse | null;
};

export default class App extends Component<Readonly<object>, AppState> {
  constructor(props: Readonly<object>) {
    super(props);
    this.state = {
      isLoading: false,
      searchParams: localStorage.getItem('lastSearchRow') || '',
      searchData: null,
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount(): void {
    this.getData(this.state.searchParams);
  }

  handleSearchSubmit = async (name: string) => {
    this.getData(name);
  };

  render(): ReactNode {
    return (
      <>
        <SearchForm value={'search'} handleSubmit={this.handleSearchSubmit} />
        <hr></hr>
        {this.state.isLoading ? (
          <Loader />
        ) : this.state.searchData ? (
          <DataList response={this.state.searchData} />
        ) : (
          <p>NO DATA</p>
        )}
      </>
    );
  }

  getData = async (name: string) => {
    this.setState({ isLoading: true });
    setTimeout(async () => {
      const getResponse = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}`,
        {
          method: 'GET',
        }
      ).catch((error) => console.log(error));
      if (getResponse && getResponse.status === 200) {
        this.setState({
          searchData: await getResponse.json(),
          searchParams: name,
          isLoading: false,
        });
      }
    }, 3000);
  };
}
