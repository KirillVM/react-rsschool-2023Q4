import './button.css';
import { ButtonProps } from './button.interface';

const Button = ({
  className,
  text,
  type,
  callBack,
  dataTestid,
}: ButtonProps): React.JSX.Element => {
  return (
    <button
      className={`button ${className.join(' ')}`}
      type={type}
      onClick={callBack}
      data-testid={dataTestid}
    >
      {text}
    </button>
  );
};

export default Button;
