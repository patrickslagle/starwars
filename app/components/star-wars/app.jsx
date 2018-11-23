import React, { Component } from 'react';
import Person from './person.jsx';
export default class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      peopleApiRoute: 'https://swapi.co/api/people/',
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
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { people } = this.state;
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
      </div>
    );
  }
}
