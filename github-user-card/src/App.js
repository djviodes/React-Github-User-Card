import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    users: [],
    userId: ''
  }

  componentDidMount() {
    this.fetchUsers('djviodes');
  }

  fetchUsers = (user) => {
    axios.get(`https://api.github.com/users/${user}`)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange = (event) => {
    this.setState({ userId: event.target.value });
  }

  handleSearch = (event) => {
    event.preventDefault();
    this.fetchUsers(this.state.userId);
    this.setState({ userId: '' });
  }

  render() {
    return(
      <div className='App'>
        <h1>Search Github Users</h1>
        <form onSubmit={this.handleSearch}>
          <input value={this.state.userId} onChange={this.handleChange} type='text' />
          <button>Fetch Users</button>
        </form>
        <div className='userContainer'>
          <p>{this.state.users.login}</p>
          <p>{this.state.users.name}</p>
          <p>Public Repositories: {this.state.users.public_repos}</p>
        </div>
      </div>
    )
  }
}

export default App;