import './button.css';

type ButtonProps = {
  className: string[];
  text: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  callBack?: () => void;
  dataTestid?: string;
};

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
