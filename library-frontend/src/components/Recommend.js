import React, { useEffect, useState } from 'react'
import { FAVORITE_GENRE, BOOKS_BY_GENRE } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const books = useQuery(BOOKS_BY_GENRE, { variables: { genre: favoriteGenre } })
  const userFavoriteGenre = useQuery(FAVORITE_GENRE)

  useEffect(() => {
    const user = userFavoriteGenre.data?.me
    if (user) {
      setFavoriteGenre(user.favoriteGenre)
    }
  }, [userFavoriteGenre])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      {
        !favoriteGenre
          ? <div><p>You don't have a favorite genre</p></div>
          : (
            <div>
              <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
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
                  {books.data?.allBooks.map(a =>
                    <tr key={a.title}>
                      <td>{a.title}</td>
                      <td>{a.author.name}</td>
                      <td>{a.published}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            )
      }
    </div>
  )
}

export default Recommend
