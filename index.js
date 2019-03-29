const { ApolloServer, gql } = require("apollo-server");
const uuidv1 = require("uuid/v1");

const users = [
  {
    id: uuidv1(),
    accountHolderName: "J.K. Rowling"
  },
  {
    id: uuidv1(),
    accountHolderName: "Michael Crichton"
  }
];

const banks = [
  {
    id: 1,
    name: "Citibank"
  },
  {
    id: 2,
    name: "JP Morgan Chase"
  }
];

const branches = [
  {
    id: 1,
    name: "LA Central"
  },
  {
    id: 2,
    name: "Branch 42"
  }
];

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
    accountNumber: Int
    employeeNumber: Int
    lastUpdated: DateTime
  }

  input BankUserInput {
    accountHolderName: String
    employeeName: String
    bank: ID
    branch: ID
    accountType: String
    accountNumber: Int
    employeeNumber: Int
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

const resolvers = {
  Query: {
    users: () => users,
    banks: () => banks,
    branches: () => branches
  },
  Mutation: {
    addUser: (parent, args) => {
      const { user } = args;
      const newUser = {
        id: uuidv1(),
        ...user,
        bank: banks.find(bank => bank.id == user.bank),
        branch: branches.find(branch => branch.id == user.branch)
      };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent, args) => {
      const { id, user: updatedUser } = args;
      const index = users.findIndex(user => user.id == id);
      if (index !== -1) {
        users[index] = {
          ...users[index],
          ...updatedUser,
          bank: banks.find(bank => bank.id == updatedUser.bank),
          branch: branches.find(branch => branch.id == updatedUser.branch),
          lastUpdated: new Date()
        };
        return users[index];
      }
    },
    deleteUser: (parent, args) => {
      const { id } = args;
      const index = users.findIndex(user => user.id == id);
      if (index !== -1) {
        users.splice(index, 1);
        return users;
      }
    },
    deleteUsers: (parent, args) => {
      const { ids } = args;
      const indicies = ids.map(id => {
        return users.findIndex(user => user.id == id);
      });
      indicies.sort((a, b) => b - a);
      for (var i = 0; i < indicies.length; i++) {
        users.splice(indicies[i], 1);
      }

      return users;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: process.env.ENGINE_API_KEY && {
    apiKey: process.env.ENGINE_API_KEY
  }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
