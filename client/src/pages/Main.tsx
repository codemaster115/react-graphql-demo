import * as React from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import UserList from "../components/UserList";
import {
  UPDATE_USER,
  DELETE_USERS,
  ADD_USER,
  GET_USERS
} from "../config/queries";
import UserForm from "../components/UserForm";
import { BankUser, BankUserInput } from "../config/types";

interface IProps {}
interface IState {
  selectedRowKeys: string[] | number[];
  visibleModal: boolean;
  selectedUser?: BankUser;
}

export class Main extends React.Component<WithApolloClient<IProps>, IState> {
  state: IState = {
    selectedRowKeys: [],
    visibleModal: false,
    selectedUser: undefined
  };

  formRef: {
    props?: FormComponentProps<BankUserInput>;
  } = {};

  onAddUser = () => {
    this.setState({
      visibleModal: true,
      selectedUser: undefined
    });
  };

  onDeleteUsers = () => {
    const { selectedRowKeys: ids } = this.state;
    const { client } = this.props;

    client.mutate({
      mutation: DELETE_USERS,
      variables: { ids },
      update: (cache, { data: { deleteUsers } }) => {
        const data = cache.readQuery<{ users: BankUser[] }>({
          query: GET_USERS
        });
        if (data) {
          cache.writeQuery({
            query: GET_USERS,
            data: {
              users: deleteUsers
            }
          });
        }
      }
    });
  };

  onEditUser = (user: BankUser) => {
    this.setState({
      visibleModal: true,
      selectedUser: user
    });
  };

  onOk = () => {
    this.handleSubmit();
  };

  onCancel = () => {
    this.setState({
      visibleModal: false,
      selectedUser: undefined
    });
  };

  handleSubmit = () => {
    if (this.formRef.props) {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        const { selectedUser } = this.state;
        const { client } = this.props;
        if (err) {
          return;
        }

        if (values.accountNumber) {
          values.accountNumber = values.accountNumber.replace(
            /\d+/g,
            m => "0".repeat(7).substr(m.length) + m
          );
        }

        if (values.employeeNumber) {
          values.employeeNumber = values.employeeNumber.replace(
            /\d+/g,
            m => "0".repeat(15).substr(m.length) + m
          );
        }
        if (!selectedUser) {
          client
            .mutate({
              mutation: ADD_USER,
              variables: { user: values },
              update: (cache, { data: { addUser } }) => {
                const data = cache.readQuery<{ users: BankUser[] }>({
                  query: GET_USERS
                });
                if (data) {
                  cache.writeQuery({
                    query: GET_USERS,
                    data: {
                      users: data.users.concat(addUser)
                    }
                  });
                }
              }
            })
            .then(() => {
              form.resetFields();
              this.setState({ visibleModal: false });
            });
        } else {
          client
            .mutate({
              mutation: UPDATE_USER,
              variables: { id: selectedUser.id, user: values }
            })
            .then(res => {
              form.resetFields();
              this.setState({ visibleModal: false });
            });
        }
      });
    }
  };

  userFormRef = (formRef: { props: FormComponentProps<BankUserInput> }) => {
    this.formRef = formRef;
  };

  render() {
    const { visibleModal, selectedRowKeys, selectedUser } = this.state;

    return (
      <div className="App">
        <Button icon="plus" onClick={this.onAddUser}>
          Add User
        </Button>
        <Button
          icon="delete"
          disabled={selectedRowKeys.length <= 0}
          onClick={this.onDeleteUsers}
        >
          Delete User
        </Button>
        <UserList
          onEdit={this.onEditUser}
          onSelectionChange={items => this.setState({ selectedRowKeys: items })}
        />
        <UserForm
          wrappedComponentRef={this.userFormRef}
          visible={visibleModal}
          user={selectedUser}
          onOk={this.onOk}
          onCancel={this.onCancel}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default withApollo(Main);
