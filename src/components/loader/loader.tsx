import { Component, ReactNode } from 'react';
import './loader.css';

export default class Loader extends Component {
  render(): ReactNode {
    return (
      <>
        <div className="loader">
          <p style={{ margin: 0 }}>Please wait.....</p>
          <img
            src="https://media.tenor.com/H2mK_NOHBh8AAAAi/rick-and.gif"
            alt="loader"
          />
        </div>
      </>
    );
  }
}
