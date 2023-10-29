import { Component } from 'react';

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
      text: 'Submit',
    };
  }
  render() {
    return (
      <button
        className={this.props.className.join(' ')}
        type={(this.state as ButtonState).type}
      >
        {(this.state as ButtonState).text}
      </button>
    );
  }
}
