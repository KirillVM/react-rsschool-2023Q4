import { Component, ReactNode } from 'react';
import {
  RickAndMortyResponse,
  RickAndMortyResponseResult,
  RickAndMortyResponseinfo,
} from '../../types/ram-interfaces';
import Data from './data/data';
import './data-list.css';

type DataListProps = {
  responce: RickAndMortyResponse;
};

type DataListState = {
  responceInfo: RickAndMortyResponseinfo;
  responseResults: RickAndMortyResponseResult[];
};

export default class DataList extends Component<DataListProps, DataListState> {
  constructor(props: DataListProps) {
    super(props);
    this.state = {
      responceInfo: this.props.responce.info,
      responseResults: this.props.responce.results,
    };
  }

  render(): ReactNode {
    const rows: ReactNode[] = [];
    this.state.responseResults.forEach(
      (element: RickAndMortyResponseResult): void => {
        rows.push(<Data responceResult={element} />);
      }
    );
    return <div className={'data-list-wrapper'}>{rows}</div>;
  }
}
