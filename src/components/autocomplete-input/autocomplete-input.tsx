import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
import './autocomplete-input.css';
//import { string } from "yup";

const keyCode = {
  // ControlLeft
  // AltLeft
  // AltRight
  // ControlRight
  tab: 'Tab',
  shiftRight: 'ShiftRight',
  shiftLeft: 'ShiftLeft',
  enter: 'Enter',
  arrowUp: 'ArrowUp',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  arrowDown: 'ArrowDown',
  escape: 'Escape',
  space: 'Space',
};

const onInputPressArrowDown = (e: KeyboardEvent<HTMLInputElement>) => {
  return e;
};

const getOptions = () => {};

interface AutoInputProps {
  countries: string[];
}

const AutoInput = (props: AutoInputProps): JSX.Element => {
  const { countries } = props;
  const [inputData, setInputData] = useState<string>('');
  const optionsList = useRef<HTMLUListElement>(null);
  const [isShowOptions, setIsShowOptions] = useState<boolean>(false);

  // useCallback ????
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputData(e.target.value);
  };

  const onInputType = (e: KeyboardEvent<HTMLInputElement>) => {
    if (inputData.trim().length > 0) {
      const options = getOptions();
      return { e, options }; // для пушаа
    }
  };

  const handleInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.code);
    switch (e.code) {
      case keyCode.escape:
      case keyCode.enter:
      case keyCode.space:
      case keyCode.tab:
      case keyCode.arrowUp:
      case keyCode.arrowLeft:
      case keyCode.arrowRight:
      case keyCode.shiftLeft:
      case keyCode.shiftRight:
        break;
      case keyCode.arrowUp:
        onInputPressArrowDown(e);
        break;
      default:
        onInputType(e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: Event): void => {
      if (!optionsList.current?.contains(e.target as Node)) {
        setIsShowOptions(false);
      }
    };
    document.body.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsShowOptions]);

  return (
    <div className="auto-input">
      <label htmlFor="country">
        <p>Country</p>
      </label>
      <select
        name="countries"
        id="countries"
        aria-hidden="true"
        tabIndex={-1}
        className="visually-hiden"
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <div className="autocomlete">
        <input
          id="country"
          type="text"
          role="combobox"
          aria-owns="country_autocomplete-options"
          aria-autocomplete="list"
          autoCapitalize="none"
          aria-expanded="false"
          onKeyUp={handleInputKeyUp}
          onChange={handleInputChange}
        />
      </div>
      <ul
        ref={optionsList}
        id="country_autocomplete-options"
        role="listbox"
        className={isShowOptions ? '' : 'hiden'}
      >
        {countries.map((country, index) => {
          return (
            <li
              role="option"
              key={country}
              tabIndex={-1}
              aria-selected={index == 1 ? 'true' : 'false'}
              data-option-value={index}
              id={`autocomplete_${index}`}
            >
              {country}
            </li>
          );
        })}
      </ul>
      <div aria-live="polite" role="status" className="visually-hiden">
        {countries.length} country available
      </div>
    </div>
  );
};

export default AutoInput;
