import React from 'react'

const Movie = (props) => (
  <div>
    <h2>{props.title}</h2>
    <p>Rating: {props.rating}</p>
  </div>
)

export default Movie
