import { ChangeEvent, FC } from 'react';

import classes from './Checkbox.module.scss';

export interface CheckboxProps extends Pick<HTMLInputElement, 'checked'> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export const Checkbox: FC<CheckboxProps> = ({ onChange, checked, label }) => {
  return (
    <div className={classes.Checkbox}>
      <input id={label} type={'checkbox'} checked={checked} className={classes.CheckboxInput} onChange={onChange} />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
