
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, BOOKS_BY_GENRE, BOOK_ADDED } from './queries'
import Recommend from './components/Recommend'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  /*
  * It is made this way to practice using graphql queries with parameters
  ^ and using Set to combine the genres and make a new query with the selected genre.
  */
  const books = useQuery(BOOKS_BY_GENRE, { variables: { genre: genre } })
  const allBooks = useQuery(BOOKS_BY_GENRE, { variables: { genre: '' } })
  const [token, setToken] = useState(null)

  const store = useApolloClient()

  useEffect(() => {
    const savedToken = window.localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
    }
    const genresOfAllBooks = new Set(
      allBooks.data?.allBooks
        .map(book => book.genres)
        .reduce((prev, current) => prev.concat(current))
    )
    setGenres([...genresOfAllBooks])
  }, [allBooks])

  const logout = () => {
    window.localStorage.clear()
    setPage('authors')
    setToken(null)
  }
  const handleGenre = (newGenre) => {
    setGenre(newGenre)
  }
  const addGenres = (newGenres) => {
    const updatedGenres = new Set(genres.concat(newGenres))
    setGenres([...updatedGenres])
  }
  const handleNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded

      // window.alert(JSON.stringify(subscriptionData.data.bookAdded))
      handleCache(newBook)
    }
  })

  const handleCache = (newBook) => {
    const booksInStore = store.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: '' } })
    store.writeQuery({
      query: BOOKS_BY_GENRE,
      variables: { genre: '' },
      data: {
        ...booksInStore,
        allBooks: [...booksInStore.allBooks, newBook]
      }
    })

    const authorsInStore = store.readQuery({ query: ALL_AUTHORS })
    const authorIsCached = authorsInStore.allAuthors.find(a => a.id === newBook.author.id)

    let newAuthors
    if (authorIsCached) {
      newAuthors = [...authorsInStore.allAuthors
        .map(a => a.id === newBook.author.id ? { ...a, bookCount: newBook.author.bookCount } : a)]
    } else {
      newAuthors = [...authorsInStore.allAuthors, newBook.author]
    }

    store.writeQuery({
      query: ALL_AUTHORS,
      data: {
        ...authorsInStore,
        allAuthors: newAuthors
      }
    })
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          !token
            ? <button onClick={() => setPage('login')}>login</button>
            : (
              <>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>recommend</button>
                <button onClick={logout}>logout</button>
              </>
              )
        }

      </div>
      <Notification errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        token={token}
        authors={authors.data?.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={books.data?.allBooks}
        genre={genre}
        genres={genres}
        handleGenre={handleGenre}
      />

      <NewBook
        addGenres={addGenres}
        setError={handleNotification}
        // handleCache={handleCache}
        show={page === 'add'}
      />
      <Recommend
        show={page === 'recommend'}
      />

      <LoginForm
        show={page === 'login'}
        setError={handleNotification}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App
