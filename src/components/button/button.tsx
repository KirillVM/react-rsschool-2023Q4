import { useState } from 'react';
import './button.css';

type ButtonProps = {
  className: string[];
};

const Button = ({className}: ButtonProps): React.JSX.Element => {
    const [type, setType] = useState<'submit' | 'button' | 'reset' | undefined>('submit');
    const [text, setText] = useState<string>('Search');
    return (
      <button className={className.join(' ')} type={type}>
        {text}
      </button>
    );
}

export default Button;
