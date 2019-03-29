import * as React from "react";
import { withQuery, DataProps } from "react-apollo";
import { Table, Button } from "antd";
import { BankUser } from "../config/types";
import { GET_USERS } from "../config/queries";
import { ColumnProps } from "antd/lib/table";

class UserTable extends Table<BankUser> {}

interface Response {
  users: Array<BankUser>;
}

interface OwnProps {
  onEdit: (user: BankUser) => void;
  onSelectionChange: (
    selectedRowKeys: string[] | number[],
    selectedRows: BankUser[]
  ) => void;
}

class UserList extends React.Component<OwnProps & DataProps<Response>> {
  columns: ColumnProps<BankUser>[] = [
    {
      title: "Account Holder Name",
      dataIndex: "accountHolderName",
      sorter: (a, b) => (a.accountHolderName < b.accountHolderName ? 1 : -1)
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      sorter: (a, b) => (a.employeeName < b.employeeName ? 1 : -1)
    },
    {
      title: "Bank name",
      dataIndex: "bank.name",
      sorter: (a, b) => (a.bank.name < b.bank.name ? 1 : -1)
    },
    {
      title: "Branch name",
      dataIndex: "branch.name",
      sorter: (a, b) => (a.branch.name < b.branch.name ? 1 : -1)
    },
    {
      title: "Account type",
      dataIndex: "accountType",
      sorter: (a, b) => (a.accountType < b.accountType ? 1 : -1)
    },
    {
      title: "Account number",
      dataIndex: "accountNumber"
    },
    {
      title: "Employee number",
      dataIndex: "employeeNumber"
    },
    {
      title: "",
      render: (text, record) => {
        return <Button onClick={() => this.handleEdit(record)}>Edit</Button>;
      }
    }
  ];

  handleEdit(user: BankUser) {
    const { onEdit } = this.props;
    onEdit(user);
  }

  render() {
    const { data, onSelectionChange } = this.props;
    const { loading, users } = data;

    return (
      <UserTable
        bordered
        loading={loading}
        rowKey="id"
        columns={this.columns}
        dataSource={users}
        rowSelection={{
          onChange: onSelectionChange
        }}
      />
    );
  }
}

export { UserTable };

export default withQuery<OwnProps, Response, {}, DataProps<Response>>(
  GET_USERS
)(UserList);
