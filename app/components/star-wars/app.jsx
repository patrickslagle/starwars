import React, { Component } from 'react';
import Person from './person.jsx';
import FooterNav from './footer-nav.jsx';
import SearchPeople from './search-people.jsx';

export default class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      peopleApiRoute: 'https://swapi.co/api/people/',
      nextPeopleApiRoute: null,
      prevPeopleApiRoute: null,
      loadingPeople: false,
    };
    this.fetchPeople = this.fetchPeople.bind(this);
  }

  componentDidMount() {
    const { peopleApiRoute } = this.state;
    this.fetchPeople(peopleApiRoute);
  }

  /**
   * fetches a set of star wars characters based on the API route given, along with
   * the API route for the next and previous set of characters
   */
  async fetchPeople(ApiRoute) {
    // set loadingPeople to true to temporarily disable any buttons that could call fetchPeople
    await this.setState({ loadingPeople: true });
    fetch(ApiRoute)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Unable to fetch people'));
      })
      .then((body) => {
        // update state with Star Wars characters found, and API routes for the next and prev characters
        this.setState({
          people: body.results,
          nextPeopleApiRoute: body.next,
          prevPeopleApiRoute: body.previous,
          loadingPeople: false,
        });
      })
      .catch(() => console.error('Unable to fetch people'));
  }

  render() {
    const { people, nextPeopleApiRoute, prevPeopleApiRoute, loadingPeople } = this.state;
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
      <div id="wallpaper">
        <div id="app">
          <h1 id="header">Star Wars People</h1>
          <SearchPeople
            fetchPeople={this.fetchPeople}
          />
          <div id="people-container">
            {personArray}
          </div>
          <FooterNav
            next={nextPeopleApiRoute}
            prev={prevPeopleApiRoute}
            fetchPeople={this.fetchPeople}
            loadingPeople={loadingPeople}
          />
        </div>
      </div>
    );
  }
}
