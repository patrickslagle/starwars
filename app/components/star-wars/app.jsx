import React, { Component } from 'react';
import FooterNav from './footer-nav.jsx';
import SearchPeople from './search-people.jsx';
import Person from './person.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      peopleApiRoute: 'https://swapi.co/api/people/',
      currentAPIRoute: 'https://swapi.co/api/people/',
      nextPeopleApiRoute: null,
      prevPeopleApiRoute: null,
      loadingPeople: false,
    };
    this.fetchPeople = this.fetchPeople.bind(this);
  }

  // Load Star Wars people once component has mounted
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
    await this.setState({
      loadingPeople: true,
      currentAPIRoute: ApiRoute,
    });
    fetch(ApiRoute)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Unable to fetch people'));
      })
      .then((body) => {
        const { currentAPIRoute } = this.state;
        if (ApiRoute === currentAPIRoute) {
          this.setState({
            people: body.results,
            nextPeopleApiRoute: body.next,
            prevPeopleApiRoute: body.previous,
            loadingPeople: false,
          });
        }
      })
      .catch(() => console.error('Unable to fetch people'));
  }

  renderPeopleOrLoad() {
    const { people, loadingPeople } = this.state;
    // data is being loaded, show loading img
    if (loadingPeople) {
      return <img src="https://www.growingagreenerworld.com/wp-content/uploads/2015/03/loading.gif" alt="loading" />;
    }
    // data is not being loaded, create array of Person Components from people data
    return people.map(person => (
      <Person
        key={person.url}
        name={person.name}
        height={person.height}
        mass={person.mass}
        gender={person.gender}
      />
    ));
  }

  render() {
    const { nextPeopleApiRoute, prevPeopleApiRoute, loadingPeople } = this.state;
    return (
      <div id="wallpaper">
        <div id="app">
          <h1 id="header">Star Wars People</h1>
          <SearchPeople
            fetchPeople={this.fetchPeople}
          />
          <div id="people-container">
            {this.renderPeopleOrLoad()}
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
