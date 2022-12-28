import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({
      query: e.target.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error(
        'Sorry, there are no images matching your search query. Please try again.',
        { theme: 'colored' }
      );
    };

    this.props.onSubmit(this.state.query);
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLable}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            // autocomplete="off"
            // autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            name="search"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
