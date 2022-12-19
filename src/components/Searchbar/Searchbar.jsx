import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { BsSearch } from 'react-icons/bs';
import { Form, Header } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <>
      <Header>
        <Form onSubmit={handleFormSubmit}>
          <button type="submit">
            <span>Search</span>
            <BsSearch />
          </button>

          <input
            onChange={e => setInput(e.target.value)}
            name="input"
            value={input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    </>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
