import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ name, height, gender, mass }) => (
  <div className="person">
    <h3>{name}</h3>
    <ul>
      <li>Height: {height}</li>
      <li>Gender: {gender}</li>
      <li>Mass: {mass}</li>
    </ul>
  </div>
);

Person.propTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  mass: PropTypes.string.isRequired,
};

export default Person;
