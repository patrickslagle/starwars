import React from 'react';
import PropTypes from 'prop-types';

const SearchPeople = ({ fetchPeople }) => {
  // fetches Star Wars characters that contain the text in the input
  const autocomplete = (event) => {
    fetchPeople(`https://swapi.co/api/people/?search=${event.target.value}`);
  };

  return (
    <input
      id="search-bar"
      placeholder="Search Characters..."
      onChange={autocomplete}
    />
  );
};

SearchPeople.propTypes = {
  fetchPeople: PropTypes.func.isRequired,
};

export default SearchPeople;
