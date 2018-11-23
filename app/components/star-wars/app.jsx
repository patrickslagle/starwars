import React, { Component } from 'react';
import Person from './person.jsx';
import FooterNav from './footer-nav.jsx';

export default class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      peopleApiRoute: 'https://swapi.co/api/people/',
      nextPeopleApiRoute: null,
      prevPeopleApiRoute: null,
    };
    this.fetchPeople = this.fetchPeople.bind(this);
  }

  componentDidMount() {
    const { peopleApiRoute } = this.state;
    this.fetchPeople(peopleApiRoute);
  }

  fetchPeople(ApiRoute) {
    fetch(ApiRoute)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Unable to fetch people'));
      })
      .then((body) => {
        this.setState({
          people: body.results,
          nextPeopleApiRoute: body.next,
          prevPeopleApiRoute: body.previous,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { people, nextPeopleApiRoute, prevPeopleApiRoute } = this.state;
    // create array of Person Components from people data
    const personArray = people.map(person => (
      <Person
        key={person.url}
        name={person.name}
        height={person.height}
        mass={person.mass}
        gender={person.gender}
      />
    ));
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Star Wars People</h1>
        <div id="people-container">
          {personArray}
        </div>
        <FooterNav
          next={nextPeopleApiRoute}
          prev={prevPeopleApiRoute}
          fetchPeople={this.fetchPeople}
        />
      </div>
    );
  }
}
