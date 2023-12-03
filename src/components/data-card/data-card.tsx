import './data-card.css';
import { FormState } from '@components/forms/form-interfaces';

type DataCardProps = {
  formData: FormState;
};

const DataCard = (props: DataCardProps): JSX.Element => {
  const { formData } = props;

  return (
    <>
      <div data-testid="detailed-card" className="data-card-wrapper">
        <img
          src={formData.avatar}
          alt="img"
          className={'data-img'}
          placeholder="img"
        />
        <ul>
          {Object.entries(formData).map(
            (data: [string, string]): JSX.Element | '' => {
              return data[0] !== 'avatar' ? (
                <li data-testid="data-card-name" key={`${data[0]}${data[1]}`}>
                  {`${data[0].charAt(0).toUpperCase() + data[0].slice(1)}: ${
                    data[1]
                  }`}
                </li>
              ) : (
                ''
              );
            }
          )}
        </ul>
      </div>
    </>
  );
};

export default DataCard;
