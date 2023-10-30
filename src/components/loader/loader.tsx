import { Component } from 'react';
import './loader.css';

export default class Loader extends Component {
  render() {
    return (
      <>
        <div className="loader">
          <p>Please wait.....</p>
          <img
            src="https://media.tenor.com/H2mK_NOHBh8AAAAi/rick-and.gif"
            alt="loader"
          />
        </div>
      </>
    );
  }
}
