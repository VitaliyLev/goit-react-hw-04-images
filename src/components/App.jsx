import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { Box } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalPageApiRequest, setTotalPageApiRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState(null);

  //   const rest = async (q, p) => {
  //   try {
  //      return response = await axios.get(
  //           `https://pixabay.com/api/?q=${q}&page=${p}&key=31278796-a3a5484ed91accb8b7bce1cf7&image_type=photo&orientation=horizontal&per_page=12`
  //      );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  useEffect(() => {
    //   rest(q, p).then(res => {

    //   } ).catch()

    if (query === '') {
      return;
    }

    if (page === 1) {
      setArticles([]);
    }
    async function searchApiRequest() {
      setStatus('pending');

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=31278796-a3a5484ed91accb8b7bce1cf7&image_type=photo&orientation=horizontal&per_page=12`
        );

        const currentSearchImage = response.data.hits;
        const totalpageApi = Math.ceil(response.data.totalHits / 12);

        setArticles(prevArticles => [...prevArticles, ...currentSearchImage]);
        setStatus('resolved');
        setTotalPageApiRequest(totalpageApi);

        if (currentSearchImage.length !== 0 && page === 1) {
          toast.success(`Found ${response.data.totalHits} pictures!  `);
        }

        if (currentSearchImage.length === 0) {
          toast.error('Invalid query, please try again!');
        }

        if (page > 2) {
          window.scrollTo({
            top: document.documentElement.scrollHeight * 10,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        toast.error('Something went wrong, please try again!');
        setStatus('rejected');
      }
    }
    searchApiRequest();
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const toggleModal = largeImageURL => {
    setShowModal(showModal => !showModal);
    setImageModal(largeImageURL);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <Box>
        {articles.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem articles={articles} onClick={toggleModal} />
          </ImageGallery>
        )}

        {status === 'pending' && <Loader />}

        {articles.length >= 12 && totalPageApiRequest !== page && (
          <LoadMoreBtn onClick={() => setPage(prevPage => prevPage + 1)} />
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={imageModal} alt="" />
          </Modal>
        )}

        <Toaster position="top-right" reverseOrder={true} />
      </Box>
    </>
  );
}
