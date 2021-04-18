import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_AUTHORS = gql`
query {
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
      name
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
export const BOOKS_BY_GENRE = gql`
query booksByGenre($genre: String!) {
  allBooks( genre: $genre) {
    id 
    title 
    author {
      name
      born
    }
    genres
    published 
  }
}
`

export const FAVORITE_GENRE = gql`
query {
  me {
    favoriteGenre
  }
}
`
