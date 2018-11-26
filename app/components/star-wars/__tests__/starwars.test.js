import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';
import App from '../app.jsx';
import FooterNav from '../footer-nav.jsx';
import SearchPeople from '../search-people.jsx';
import Person from '../person.jsx';

configure({ adapter: new Adapter() });

test('App component renders properly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

test('FooterNav component renders properly', () => {
  const fetchPeopleMock = jest.fn();
  const wrapper = shallow(
    <FooterNav 
      fetchPeople={fetchPeopleMock}
      loadingPeople={false}
      next="https://swapi.co/api/people/?page=3"
      prev="https://swapi.co/api/people/?page=1"
    />,
  );
  expect(wrapper).toMatchSnapshot();
});

test('Person component renders properly', () => {
  const wrapper = shallow(
    <Person
      name="Luke Skywalker"
      mass="82"
      gender="male"
      height="172"
    />,
  );
  expect(wrapper).toMatchSnapshot();
});

test('SearchPeople component renders properly', () => {
  const fetchPeopleMock = jest.fn();
  const wrapper = shallow(
    <SearchPeople fetchPeople={fetchPeopleMock} />,
  );
  expect(wrapper).toMatchSnapshot();
});