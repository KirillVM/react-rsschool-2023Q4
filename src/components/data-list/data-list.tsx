import { Component, ReactNode } from 'react';
import {
  RickAndMortyResponse,
  RickAndMortyResponseResult,
  RickAndMortyResponseinfo,
} from '../../types/ram-interfaces';
import Data from './data/data';
import './data-list.css';

type DataListProps = {
  response: RickAndMortyResponse;
};

type DataListState = {
  responseInfo: RickAndMortyResponseinfo;
  responseResults: RickAndMortyResponseResult[];
};

export default class DataList extends Component<DataListProps, DataListState> {
  constructor(props: DataListProps) {
    super(props);
    this.state = {
      responseInfo: this.props.response.info,
      responseResults: this.props.response.results,
    };
  }

  shouldComponentUpdate(nextProps: Readonly<DataListProps>): boolean {
    if (nextProps.response.results !== this.state.responseResults) {
      this.setState({
        responseInfo: nextProps.response.info,
        responseResults: nextProps.response.results,
      });
      return true;
    }
    return false;
  }

  render(): ReactNode {
    return (
      <div className={'data-list-wrapper'}>
        {this.state.responseResults.map(
          (element: RickAndMortyResponseResult, i: number) => {
            return (
              <Data key={`${i}${element.name}`} responseResult={element} />
            );
          }
        )}
      </div>
    );
  }
}
