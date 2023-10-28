import { Component } from 'react';

export default class Button extends Component {
  constructor(props: Readonly<object>) {
    super(props);
    this.state = {
      type: 'submit',
      text: 'Button',
    };
  }
  render() {
    return <button> asd </button>;
  }
}
