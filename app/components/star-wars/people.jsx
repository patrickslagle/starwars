import React from 'react';

export default class People extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: []
    };
  }

  componentDidMount() {
    const component = this
    fetch('https://swapi.co/api/people/')  
      .then(function(response) {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('Unable to fetch people')
        }
      }).then((body) => {
        const people = body.results
        component.setState({ people })
      })
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
