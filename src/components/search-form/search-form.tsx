import { Component, ReactNode, SyntheticEvent } from 'react';
import Button from '../button/button';
import './search-form.css';

type SearchProps = {
  value: string;
  handleSubmit: (event: SyntheticEvent, name: string) => Promise<void>;
};

type SearchState = {
  value: string;
};

export default class SearchForm extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: localStorage.getItem('lastSearchRow') || '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: SyntheticEvent): void {
    this.setState({ value: (event.target as HTMLInputElement).value });
  }

  handleSubmit(event: SyntheticEvent): void {
    localStorage.setItem('lastSearchRow', this.state.value);
    this.props.handleSubmit(event, this.state.value);
  }

  render(): ReactNode {
    return (
      <form className={'search-form'} onSubmit={this.handleSubmit}>
        <label>
          <p>Search:</p>
          <input
            placeholder="Search"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          ></input>
        </label>
        <Button className={['button']} />
      </form>
    );
  }
}
