import React from "react";
import { Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { BankUserInput, BankUser } from "../../config/types";

interface IProps extends FormComponentProps<BankUserInput> {
  user?: BankUser;
}

const Step2 = ({ form, user }: IProps) => {
  const { getFieldDecorator } = form;

  return (
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
          initialValue: user && user.accountNumber,
          rules: [{ max: 7 }]
        })(<Input placeholder={"Account Number"} />)}
      </Form.Item>
    </React.Fragment>
  );
};

export default Step2;
