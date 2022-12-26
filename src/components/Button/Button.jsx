import React from 'react';
import css from './Button.module.css';

export const Button = ({ response }) => (
  <button type="button" className={css.Button} onClick={response}>
    Load more
  </button>
);
