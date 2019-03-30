import * as React from "react";
import { withQuery, DataProps } from "react-apollo";
import { Table, Button, Icon, Input } from "antd";
import { ColumnProps } from "antd/lib/table";
import Search from "antd/lib/input/Search";

import { BankUser } from "../config/types";
import { GET_USERS } from "../config/queries";

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

  searchInput: Search | null = null;

  getColumnSearchProps = (dataIndex: string) => {
    if (dataIndex) {
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }: {
          setSelectedKeys: Function;
          selectedKeys: Array<any>;
          confirm: Function;
          clearFilters: Function;
        }) => (
          <div style={{ padding: 8 }}>
            <Input.Search
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              onSearch={() => this.handleSearch(selectedKeys, confirm)}
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <Icon
            type="search"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        ),
        onFilter: (value: any, record: BankUser) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: boolean) => {
          if (visible) {
            setTimeout(() => this.searchInput && this.searchInput.focus());
          }
        }
      };
    }
  };

  handleSearch = (selectedKeys: Array<any>, confirm: Function) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters: Function) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleEdit(user: BankUser) {
    const { onEdit } = this.props;
    onEdit(user);
  }

  render() {
    const { data, onSelectionChange } = this.props;
    const { loading, users } = data;
    const tableColumns = this.columns.map(column => ({
      ...column,
      ...this.getColumnSearchProps(column.dataIndex || "")
    }));

    return (
      <UserTable
        bordered
        loading={loading}
        rowKey="id"
        columns={tableColumns}
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
