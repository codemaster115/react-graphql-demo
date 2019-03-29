import gql from "graphql-tag";

const GET_BANKS = gql`
  {
    banks {
      id
      name
    }
  }
`;

const GET_BRANCHES = gql`
  {
    branches {
      id
      name
    }
  }
`;

const GET_USERS = gql`
  {
    users {
      id
      accountHolderName
      employeeName
      bank {
        id
        name
      }
      branch {
        id
        name
      }
      accountType
      accountNumber
      employeeNumber
      lastUpdated
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($user: BankUserInput!) {
    addUser(user: $user) {
      id
      accountHolderName
      employeeName
      bank {
        id
        name
      }
      branch {
        id
        name
      }
      accountType
      accountNumber
      employeeNumber
      lastUpdated
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $user: BankUserInput!) {
    updateUser(id: $id, user: $user) {
      id
      accountHolderName
      employeeName
      bank {
        id
        name
      }
      branch {
        id
        name
      }
      accountType
      accountNumber
      employeeNumber
      lastUpdated
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const DELETE_USERS = gql`
  mutation deleteUsers($ids: [ID]!) {
    deleteUsers(ids: $ids) {
      id
      accountHolderName
      employeeName
      bank {
        id
        name
      }
      branch {
        id
        name
      }
      accountType
      accountNumber
      employeeNumber
      lastUpdated
    }
  }
`;

export {
  GET_BANKS,
  GET_BRANCHES,
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  DELETE_USERS
};
