import { Component, SyntheticEvent } from 'react';

type SearchProps = {
  value: string;
};

interface SearchState {
  value: string;
  responseData: object | null;
}
export default class SearchForm extends Component {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: '0' || props.value,
      responseData: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: SyntheticEvent): void {
    () => {
      this.setState({ value: (event.target as HTMLInputElement).value });
    };
  }

  handleSubmit(event: SyntheticEvent): void {
    async (): Promise<void> => {
      event.preventDefault();
      const getResponse = await fetch(
        'https://rickandmortyapi.com/api/character',
        {
          method: 'GET',
        }
      );
      this.setState({ responseData: await getResponse.json() });
      console.log((this.state as SearchState).responseData);
    };
  }
}
