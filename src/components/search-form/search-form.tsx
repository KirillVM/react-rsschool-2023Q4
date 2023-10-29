import { Component, SyntheticEvent } from 'react';
import Button from '../button/button';
import './search-form.css';

type SearchProps = {
  value: string;
  handleSubmit: (event: SyntheticEvent) => Promise<void>;
};

type SearchState = {
  value: string;
};

export default class SearchForm extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: SyntheticEvent): void {
    this.setState({ value: (event.target as HTMLInputElement).value });
  }

  render(): JSX.Element {
    return (
      <form className={'search-form'} onSubmit={this.props.handleSubmit}>
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
