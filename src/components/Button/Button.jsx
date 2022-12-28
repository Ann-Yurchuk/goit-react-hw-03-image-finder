import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ response }) => (
  <button type="button" className={css.Button} onClick={response}>
    Load more
  </button>
);

Button.propTypes = {
  response: PropTypes.func.isRequired,
};
