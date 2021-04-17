import { gql } from '@apollo/client'

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
export const ALL_BOOKS = gql`
query {
  allBooks {
    id 
    title 
    author
    published 
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
    author
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
