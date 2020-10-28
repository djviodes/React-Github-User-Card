import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledApp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledTitle = styled.h1`
  font-size: 4rem;
`

const StyledForm = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInput = styled.input`
  width: 50%;
  height: 3vh;
  font-size: 1.1rem;
  padding: 0 0.75%;
  border-radius: 50px;
  border: 1px solid black;
  outline: none;
  margin-bottom: 2%;
`

const StyledButton = styled.button`
  width: 10%;
  height: 3vh;
  font-size: 1.1rem;
  background-color: #36D8FF;
  border: none;
  border-radius: 50px;
  outline: none;
  margin-bottom: 2%;
  &:hover{
    cursor: pointer;
  }
  &:active{
    transform: scale(0.9);
  }
`

const StyledUserCard = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 2%;
`

const StyledImage = styled.img`
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

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
      <StyledApp>
        <StyledTitle>Search Github Users</StyledTitle>
        <h2>Stalk Your Github Friends</h2>
        <StyledForm onSubmit={this.handleSearch}>
          <StyledInput value={this.state.userId} onChange={this.handleChange} type='text' placeholder='Enter Github Username' />
          <StyledButton>Fetch Users</StyledButton>
        </StyledForm>
        <StyledUserCard className='userContainer'>
          <p>Username: {this.state.users.login}</p>
          <p>Name: {this.state.users.name}</p>
          <p>Public Repositories: {this.state.users.public_repos}</p>
          <StyledImage width='200' height='200' src={this.state.users.avatar_url} alt={this.state.users.name} />
        </StyledUserCard>
      </StyledApp>
    )
  }
}

export default App;