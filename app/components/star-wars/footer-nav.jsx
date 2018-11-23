import React from 'react';
import PropTypes from 'prop-types';

const FooterNav = ({ prev, next, fetchPeople }) => {
  // Renders a button when clicked fetches the next batch of characters
  function renderButton(buttonText, ApiRoute) {
    // only renders a button if there is an available API route.
    console.log(ApiRoute)
    if (ApiRoute) {
      return (
        <button
          type="button"
          onClick={() => fetchPeople(ApiRoute)}
        >
          {buttonText}
        </button>
      );
    }
    return null;
  }

  return (
    <footer>
      {renderButton('Prev', prev)}
      {renderButton('Next', next)}
    </footer>
  );
};

FooterNav.propTypes = {
  prev: PropTypes.string,
  next: PropTypes.string,
  fetchPeople: PropTypes.func.isRequired,
};
FooterNav.defaultProps = {
  prev: null,
  next: null,
};

export default FooterNav;
