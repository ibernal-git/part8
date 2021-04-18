import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error)
      props.setError(error.graphQLErrors[0].message)
    }
  })
  /*
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: BOOKS_BY_GENRE, variables: { genre: '' } }, { query: ALL_AUTHORS }]
  }) */

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!title || !author || !published || !genres) return null
    const publishedNumber = parseInt(published)

    createBook({ variables: { title, author, publishedNumber, genres } })
    props.addGenres(genres)

    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <div>
        <h2>new book</h2>
        <div>
          <form onSubmit={submit}>
            <div>
              title
              <input
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
              <input
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              published
              <input
                type='number'
                value={published}
                onChange={({ target }) => setPublished(target.value)}
              />
            </div>
            <div>
              <input
                value={genre}
                onChange={({ target }) => setGenre(target.value)}
              />
              <button onClick={addGenre} type='button'>add genre</button>
            </div>
            <div>
              genres: {genres.join(' ')}
            </div>
            <button type='submit'>create book</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default NewBook
