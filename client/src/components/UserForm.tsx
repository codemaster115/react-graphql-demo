import * as React from "react";
import { Modal, Select, Form, Input, Button, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { BankQuery, BranchQuery } from "./Query";
import { GET_BANKS, GET_BRANCHES } from "../config/queries";
import { BankUser, BankUserInput } from "../config/types";

const { Option } = Select;

interface IProps extends FormComponentProps<BankUserInput> {
  visible: boolean;
  user?: BankUser;
  onOk: () => void;
  onCancel: () => void;
  handleSubmit: () => void;
}

interface IState {
  curStep: number;
}

const steps: Array<{ title: string }> = [
  {
    title: "Bank Info"
  },
  {
    title: "Account Info"
  },
  {
    title: "Employee Info"
  },
  {
    title: "Confirm"
  }
];

class UserForm extends React.Component<IProps, IState> {
  state: IState = {
    curStep: 0
  };

  next() {
    const curStep = this.state.curStep + 1;
    this.setState({ curStep });
  }

  prev() {
    const curStep = this.state.curStep - 1;
    this.setState({ curStep });
  }

  render() {
    const { visible, user, onOk, onCancel, handleSubmit, form } = this.props;
    const { getFieldDecorator } = form;
    const { curStep } = this.state;

    return (
      <BankQuery query={GET_BANKS}>
        {({ loading, data }) => {
          const { banks } = data || { banks: [] };
          return (
            <BranchQuery query={GET_BRANCHES}>
              {({ loading, data }) => {
                const { branches } = data || { branches: [] };
                return (
                  <Modal
                    title={user ? "Edit User" : "Add User"}
                    visible={visible}
                    onOk={onOk}
                    onCancel={onCancel}
                  >
                    <Form>
                      {curStep === 0 && (
                        <React.Fragment>
                          <Form.Item>
                            {getFieldDecorator("bank", {
                              initialValue: user && user.bank && user.bank.id
                            })(
                              <Select>
                                {banks &&
                                  banks.map(bank => (
                                    <Option key={bank.id} value={bank.id}>
                                      {bank.name}
                                    </Option>
                                  ))}
                              </Select>
                            )}
                          </Form.Item>
                          <Form.Item>
                            {getFieldDecorator("branch", {
                              initialValue:
                                user && user.branch && user.branch.id
                            })(
                              <Select>
                                {branches &&
                                  branches.map(branch => (
                                    <Option key={branch.id} value={branch.id}>
                                      {branch.name}
                                    </Option>
                                  ))}
                              </Select>
                            )}
                          </Form.Item>
                        </React.Fragment>
                      )}
                      {curStep === 1 && (
                        <React.Fragment>
                          <Form.Item>
                            {getFieldDecorator("accountHolderName", {
                              initialValue: user && user.accountHolderName
                            })(<Input placeholder={"Account Holder Name"} />)}
                          </Form.Item>
                          <Form.Item>
                            {getFieldDecorator("accountType", {
                              initialValue: user && user.accountType
                            })(<Input placeholder={"Account Type"} />)}
                          </Form.Item>
                          <Form.Item>
                            {getFieldDecorator("accountNumber", {
                              initialValue: user && user.accountNumber
                            })(<Input placeholder={"Account Number"} />)}
                          </Form.Item>
                        </React.Fragment>
                      )}
                      {curStep === 2 && (
                        <React.Fragment>
                          <Form.Item>
                            {getFieldDecorator("employeeName", {
                              initialValue: user && user.employeeName
                            })(<Input placeholder={"Employee Name"} />)}
                          </Form.Item>
                          <Form.Item>
                            {getFieldDecorator("employeeNumber", {
                              initialValue: user && user.employeeNumber
                            })(<Input placeholder={"Employee Number"} />)}
                          </Form.Item>
                        </React.Fragment>
                      )}
                      {curStep === 3 && (
                        <React.Fragment>
                          <span>{user && user.accountHolderName}</span>
                          <span>{user && user.accountNumber}</span>
                          <span>{user && user.accountType}</span>
                          <span>{user && user.employeeName}</span>
                          <span>{user && user.employeeNumber}</span>
                          <span>{user && user.bank}</span>
                          <span>{user && user.branch}</span>
                        </React.Fragment>
                      )}
                      <div className="steps-action">
                        {curStep < steps.length - 1 && (
                          <Button onClick={() => this.next()}>Next</Button>
                        )}
                        {curStep > 0 && (
                          <Button
                            style={{ marginLeft: 8 }}
                            onClick={() => this.prev()}
                          >
                            Previous
                          </Button>
                        )}
                      </div>
                    </Form>
                  </Modal>
                );
              }}
            </BranchQuery>
          );
        }}
      </BankQuery>
    );
  }
}

export default Form.create({ name: "form_user" })(UserForm);
