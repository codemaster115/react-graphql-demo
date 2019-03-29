const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar DateTime

  type Bank {
    id: ID!
    name: String
  }

  type Branch {
    id: ID!
    name: String
  }

  type BankUser {
    id: ID!
    accountHolderName: String
    employeeName: String
    bank: Bank
    branch: Branch
    accountType: String
    accountNumber: String
    employeeNumber: String
    lastUpdated: DateTime
  }

  input BankUserInput {
    accountHolderName: String
    employeeName: String
    bank: ID
    branch: ID
    accountType: String
    accountNumber: String
    employeeNumber: String
  }

  type Query {
    users: [BankUser]
    banks: [Bank]
    branches: [Branch]
  }

  type Mutation {
    addUser(user: BankUserInput!): BankUser
    updateUser(id: ID!, user: BankUserInput!): BankUser
    deleteUser(id: ID!): [BankUser]
    deleteUsers(ids: [ID]!): [BankUser]
  }
`;

module.exports = {
  typeDefs
};
