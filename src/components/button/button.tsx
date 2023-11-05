import './button.css';

type ButtonProps = {
  className: string[];
  text: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  callBack?: () => void;
};

const Button = ({
  className,
  text,
  type,
  callBack,
}: ButtonProps): React.JSX.Element => {
  return (
    <button
      className={`button ${className.join(' ')}`}
      type={type}
      onClick={callBack}
    >
      {text}
    </button>
  );
};

export default Button;
