import * as React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";

import { GET_USERS } from "../../../config/queries";
import UserList, { UserTable } from "../../UserList";
import UserForm from "../../UserForm";
import Step1 from "../../UserForm/Step1";

const mocks = [
  {
    request: {
      query: GET_USERS
    },
    result: {
      data: {
        users: [
          {
            id: "1",
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
          }
        ]
      }
    }
  }
];

describe("UserForm", () => {
  it("renders without error", () => {
    shallow(
      <UserForm
        visible={true}
        onOk={jest.fn}
        onCancel={jest.fn}
        handleSubmit={jest.fn}
      />
    );
  });

  it("should render correctly", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserForm
          visible={true}
          onOk={jest.fn}
          onCancel={jest.fn}
          handleSubmit={jest.fn}
        />
      </MockedProvider>
    );

    expect(wrapper.find(Step1)).toHaveLength(1);
  });
});
