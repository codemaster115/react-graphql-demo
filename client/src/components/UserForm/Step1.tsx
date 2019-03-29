import React from "react";
import { Form, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { BankQuery, BranchQuery } from "../Query";
import { GET_BANKS, GET_BRANCHES } from "../../config/queries";
import { BankUserInput, BankUser } from "../../config/types";

const { Option } = Select;

interface IProps extends FormComponentProps<BankUserInput> {
  user?: BankUser;
}

const Step1 = ({ form, user }: IProps) => {
  const { getFieldDecorator } = form;
  return (
    <BankQuery query={GET_BANKS}>
      {({ data, loading, error }) => {
        if (loading || error) {
          return null;
        }
        const { banks } = data || { banks: [] };
        return (
          <BranchQuery query={GET_BRANCHES}>
            {({ data, loading, error }) => {
              if (loading || error) {
                return null;
              }
              const { branches } = data || { branches: [] };
              return (
                <React.Fragment>
                  <Form.Item>
                    {getFieldDecorator("bank", {
                      initialValue: user && user.bank && user.bank.id
                    })(
                      <Select>
                        {banks.map(bank => (
                          <Option key={bank.id} value={bank.id}>
                            {bank.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("branch", {
                      initialValue: user && user.branch && user.branch.id
                    })(
                      <Select>
                        {branches.map(branch => (
                          <Option key={branch.id} value={branch.id}>
                            {branch.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </React.Fragment>
              );
            }}
          </BranchQuery>
        );
      }}
    </BankQuery>
  );
};

export default Step1;
