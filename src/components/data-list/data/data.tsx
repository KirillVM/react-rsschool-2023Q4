import { Component, ReactNode } from 'react';
import { RickAndMortyResponseResult } from '../../../types/ram-interfaces';
import './data.css';

type DataProps = {
  responseResult: RickAndMortyResponseResult;
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
      imgUrl: this.props.responseResult.image,
      name: this.props.responseResult.name,
      status: this.props.responseResult.status,
      spacies: this.props.responseResult.species,
      type: this.props.responseResult.type || 'unknown',
      gender: this.props.responseResult.gender,
    };
  }

  render(): ReactNode {
    return (
      <div className="data-wrapper">
        <img src={this.state.imgUrl} alt="img" className={'character-img'} />
        <ul>
          {Object.entries(this.state).map(
            (data: [string, string]): ReactNode => {
              return data[0] !== 'imgUrl' ? (
                <li key={`${data[0]}${data[1]}`}>
                  {`${data[0].charAt(0).toUpperCase() + data[0].slice(1)}: ${
                    data[1]
                  }`}
                </li>
              ) : (
                ''
              );
            }
          )}
        </ul>
      </div>
    );
  }
}
