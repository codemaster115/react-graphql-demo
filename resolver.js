const uuidv1 = require("uuid/v1");

const users = [
  {
    id: uuidv1(),
    accountHolderName: "J.K. Rowling",
    accountType: "Savings",
    accountNumber: "0000042",
    employeeName: "Dr. Gregory House",
    employeeNumber: "012345678901234",
    bank: {
      id: 1,
      name: "Citibank"
    },
    branch: {
      id: 1,
      name: "LA Central"
    }
  },
  {
    id: uuidv1(),
    accountHolderName: "Michael Crichton",
    accountType: "Checking",
    accountNumber: "0001153",
    employeeName: "Mr. Robot",
    employeeNumber: "012345678901234",
    bank: {
      id: 2,
      name: "JP Morgan Chase"
    },
    branch: {
      id: 2,
      name: "Branch 42"
    }
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

module.exports = {
  resolvers
};
