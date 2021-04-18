import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_AUTHORS = gql`
query allAuthors {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $publishedNumber: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $publishedNumber,
    genres: $genres
  ) {
    id
    title
    author {
      id
      name
      bookCount
    }
    published
  }
}
`
export const EDIT_BORN = gql`
mutation editAuthor($name: String!, $setBornTo: Int) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    id
    born
  }
}
`
const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id 
  title 
  author {
    id
    name
    born
    bookCount
  }
  genres
  published
}
`

export const BOOKS_BY_GENRE = gql`
query booksByGenre($genre: String!) {
  allBooks( genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const FAVORITE_GENRE = gql`
query user {
  me {
    favoriteGenre
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
  
${BOOK_DETAILS}
`
