import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';
import App from '../app.jsx';
import FooterNav from '../footer-nav.jsx';

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