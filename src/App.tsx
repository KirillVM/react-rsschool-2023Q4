import { Component, ReactNode } from 'react';
import './App.css';
import SearchForm from './components/search-form/search-form';
import { RickAndMortyResponse } from './types/ram-interfaces';
import DataList from './components/data-list/data-list';
import Loader from './components/loader/loader';

type AppState = {
  isError: boolean;
  isLoading: boolean;
  searchParams: string;
  searchData: RickAndMortyResponse | null;
};

export default class App extends Component<Readonly<object>, AppState> {
  constructor(props: Readonly<object>) {
    super(props);
    this.state = {
      isError: false,
      isLoading: false,
      searchParams: localStorage.getItem('lastSearchRow') || '',
      searchData: null,
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount(): void {
    this.getData(this.state.searchParams);
  }

  handleSearchSubmit = async (name: string): Promise<void> => {
    this.getData(name);
  };

  render(): ReactNode {
    if (this.state.isError) {
      throw new Error('My Error');
    }
    return (
      <>
        <SearchForm value={'search'} handleSubmit={this.handleSearchSubmit} />
        <button className={'error-button'} onClick={this.errorThrow}>
          ThrowError
        </button>
        <hr></hr>
        {this.state.isLoading ? (
          <Loader />
        ) : this.state.searchData ? (
          <DataList response={this.state.searchData} />
        ) : (
          <p style={{fontSize: '2rem'}}>NO DATA. PLEASE INSERT ANOTHER SEARCH PARAMETHER</p>
        )}
      </>
    );
  }

  errorThrow = (): void => {
    this.setState({ isError: true });
  };

  getData = async (name: string): Promise<void> => {
    this.setState({ isLoading: true });
    setTimeout(async (): Promise<void> => {
      const getResponse = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}`,
        {
          method: 'GET',
        }
      ).catch((error: Error): void => console.log(error));
      if (getResponse && getResponse.status === 200) {
        this.setState({
          searchData: await getResponse.json(),
          searchParams: name,
          isLoading: false,
        });
      } else {
        this.setState({
          searchData: null,
          isLoading: false,
        });
      }
    }, 3000);
  };
}
