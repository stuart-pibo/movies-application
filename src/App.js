import React, { Component } from 'react'

import api from './api'
import Movie from './Movie'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {movies: []}
  }

  componentDidMount() {
    api.getMovies()
      .then(movies => this.setState({movies}))
  }

  render() {
    return (
      <div>
        <h1>Movies!</h1>
        {this.state.movies.map(movie => <Movie key={movie.id} {...movie} />)}
      </div>
    )
  }
}

export default App
