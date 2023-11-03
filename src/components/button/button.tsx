import { useState } from 'react';
import './button.css';

type ButtonProps = {
  className: string[];
};

const Button = ({ className }: ButtonProps): React.JSX.Element => {
  const [type] = useState<'submit' | 'button' | 'reset' | undefined>('submit');
  const [text] = useState<string>('Search');
  return (
    <button className={className.join(' ')} type={type}>
      {text}
    </button>
  );
};

export default Button;
