import { Component } from 'react';
import './button.css';

type ButtonProps = {
  className: string[];
};

type ButtonState = {
  type: 'submit' | 'button' | 'reset' | undefined;
  text: string;
};

export default class Button extends Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      type: 'submit',
      text: 'Search',
    };
  }
  render() {
    return (
      <button className={this.props.className.join(' ')} type={this.state.type}>
        {this.state.text}
      </button>
    );
  }
}
