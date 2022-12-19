import React from 'react';
import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ articles, onClick }) => {
  return (
    <>
      {articles.map(({ id, largeImageURL, tags, webformatURL }) => (
        <Item key={id} onClick={() => onClick(largeImageURL)}>
          <Image src={webformatURL} alt={tags} />
        </Item>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      previewURL: PropTypes.string.isRequired,
    })
  ).isRequired,

  onClick: PropTypes.func.isRequired,
};
