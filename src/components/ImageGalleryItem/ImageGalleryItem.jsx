import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  image: { largeImageURL, webformatURL, tags },
  openModal,
}) => {
  return (
    <>
      <li 
        className={css.ImageGalleryItem}
        onClick={() => openModal(largeImageURL)}
      >
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  openModal: PropTypes.func.isRequired,
};
