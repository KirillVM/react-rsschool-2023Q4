import { SyntheticEvent } from 'react';

export type ButtonProps = {
  className: string[];
  text: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  callBack?: (event: SyntheticEvent) => void;
  dataTestid?: string;
};
