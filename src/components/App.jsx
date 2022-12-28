import React, { Component } from 'react';
import * as API from 'fetch/fetch';
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
    error: '',
    isLoading: false,
    isShowModal: false,
    largeImageURL: '',
    tags: '',
    totalImages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    console.log(this.state.query);
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true });
      API.getImages(query, page)
        .then(({ hits, totalHits }) => {
          if (hits.length) {
            return this.setState(prev => ({
              images: [...prev.images, ...hits],
              totalImages: totalHits,
            }));
          }
          this.setState(prevState => ({
            page: prevState.page + 1,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  loadMore = e => {
    e.preventDefault();
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

  ifLoadMore = () => {
    return this.state.totalImages - this.state.images.length > 12;
  };

  render() {
    const { isLoading, images, isShowModal, largeImageURL, tags, error } =
      this.state;
    return (
      <div className={css.App}>
        <>
          <Searchbar onSubmit={this.onSearch} />
          {images.length !== 0 && (
            <>
              <ImageGallery openModal={this.openModal} images={images} />
              {this.ifLoadMore() && !isLoading && (
                <Button response={this.loadMore} />
              )}
            </>
          )}
          {isLoading && <MyLoader />}

          {error && (
            <h1>Sorry, there are no images matching your search {tags}.</h1>
          )}
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
