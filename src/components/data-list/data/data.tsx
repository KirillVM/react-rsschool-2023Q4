import { Component, ReactNode } from 'react';
import { RickAndMortyResponseResult } from '../../../types/ram-interfaces';
import './data.css';

type DataProps = {
  responceResult: RickAndMortyResponseResult;
};

type DataState = {
  imgUrl: string;
  name: string;
  status: string;
  spacies: string;
  type: string;
  gender: string;
};

export default class Data extends Component<DataProps, DataState> {
  constructor(props: DataProps) {
    super(props);
    this.state = {
      imgUrl: this.props.responceResult.image,
      name: this.props.responceResult.name,
      status: this.props.responceResult.status,
      spacies: this.props.responceResult.species,
      type: this.props.responceResult.type || 'Unknown',
      gender: this.props.responceResult.gender,
    };
    console.log(this.props.responceResult.name);
  }

  render(): ReactNode {
    return (
      <div className="data-wrapper">
        <img src={this.state.imgUrl} alt="img" />
        <ul>
          <li key={this.state.name}>{`Name: ${this.state.name}`}</li>
          <li key={this.state.status}>{`Status: ${this.state.status}`}</li>
          <li key={this.state.spacies}>{`Spacies: ${this.state.spacies}`}</li>
          <li key={this.state.type}>{`Type: ${this.state.type}`}</li>
          <li key={this.state.gender}>{`Gender: ${this.state.gender}`}</li>
        </ul>
      </div>
    );
  }
}
