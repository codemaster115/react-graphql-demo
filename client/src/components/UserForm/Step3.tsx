import React from "react";
import { Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { BankUserInput, BankUser } from "../../config/types";

interface IProps extends FormComponentProps<BankUserInput> {
  user?: BankUser;
}

const Step3 = ({ form, user }: IProps) => {
  const { getFieldDecorator } = form;

  return (
    <React.Fragment>
      <Form.Item>
        {getFieldDecorator("employeeName", {
          initialValue: user && user.employeeName
        })(<Input placeholder={"Employee Name"} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("employeeNumber", {
          initialValue: user && user.employeeNumber,
          rules: [{ max: 15 }]
        })(<Input placeholder={"Employee Number"} />)}
      </Form.Item>
    </React.Fragment>
  );
};

export default Step3;
