import React from 'react';

export default class People extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      peopleApiRoute: 'https://swapi.cosadf/api/people/',
    };
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
    const people = this.state.people
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Star Wars People</h1>
        <ul>
          {people.map(person =>
            <li key={person.url}>{person.name}</li>
          )}
        </ul>
      </div>
    )
  }
}
