import * as React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";

import { GET_USERS } from "../../config/queries";
import MainContainer, { Main } from "../Main";
import { Button } from "antd";
import UserList from "../../components/UserList";

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

describe("Main Page", () => {
  it("renders without error", () => {
    shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Main />
      </MockedProvider>
    );
  });

  it("should render correctly", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Main />
      </MockedProvider>
    );

    expect(wrapper.find(UserList)).toHaveLength(1);
  });

  it("should show UserForm modal when click add user button", () => {
    const wrapper = shallow(
      <Main />
    );

    wrapper
      .find(Button)
      .first()
      .simulate("click");
    expect(wrapper.state("visibleModal")).toBe(true);
    expect(wrapper.state("selectedUser")).toBe(undefined);
  });

  it("Delete Users button should be disabled when selectedUsers is empty", () => {
    const wrapper = shallow(
      <Main />
    );

    expect(wrapper.childAt(1).prop("disabled")).toBe(true);
  });

  it("should delete users when Delete users button is clicked", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainContainer />
      </MockedProvider>
    );

    wrapper.find(Main).setState({
      selectedRowKeys: ["1"]
    });

    console.log(wrapper.find(Main).props());
    expect(
      wrapper
        .find(Button)
        .at(1)
        .prop("disabled")
    ).toBe(false);
    wrapper
      .find(Button)
      .at(1)
      .simulate("click");
  });
});
