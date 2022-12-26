import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import MyLoader from './Loader/Loader';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    error: null,
    isLoading: false,
    isShowModal: false,
    largeImageURL: '',
    tags: '',
  };

  async componentDidUpdate(_, prevState) {
    console.log(this.state.query);
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true });

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=31258232-e3c8f840f0c2c0981cedb6e2e&q=${this.state.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
        );

        this.setState({ images: response.data.hits });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSearch = query => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  openModal = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  render() {
    const { isLoading, images, isShowModal, largeImageURL, tags, error } =
      this.state;
    return (
      <div className={css.App}>
        <>
          <Searchbar onSubmit={this.onSearch} />
          <ImageGallery openModal={this.openModal} images={images} />
          {error && (
            <h1>Sorry, there are no images matching your search {tags}.</h1>
          )}
          {isLoading && <MyLoader />}
          {images.length > 0 && <Button response={this.loadMore} />}
          {isShowModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
          <ToastContainer autoClose={3000} />
        </>
      </div>
    );
  }
}
