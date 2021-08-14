const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook: User
    removeBook: User
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [book]
  }

  type Book {
    bookId:
    authors: [String]
    description:
    title:
    image:
    link:
  }

  type Auth {
    token:
    user:
  }

`;

module.exports = typeDefs;
