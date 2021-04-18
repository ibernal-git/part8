import React from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }
  if (!props.books) {
    return (
      <div>
        <h2>books</h2>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      {
        props.genre
          ? <p>in genre <strong>{props.genre}</strong></p>
          : null
      }
      <table>
        <tbody>
          <tr>
            <th />
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {props.books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        props.genres.map(genre => {
          return <button key={genre} onClick={() => props.handleGenre(genre)}>{genre}</button>
        })
      }
      <button onClick={() => props.handleGenre('')}>All</button>

    </div>
  )
}

export default Books
