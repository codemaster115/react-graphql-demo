import * as React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";

import { GET_USERS } from "../../config/queries";
import UserList, { UserTable } from "../UserList";

const mocks = [
  {
    request: {
      query: GET_USERS
    },
    result: {
      data: {
        users: [{ id: "1", name: "test bank" }]
      }
    }
  }
];

describe("UserList", () => {
  it("renders without error", () => {
    shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserList onEdit={jest.fn} onSelectionChange={jest.fn} />
      </MockedProvider>
    );
  });

  it("should render correctly", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserList onEdit={jest.fn} onSelectionChange={jest.fn} />
      </MockedProvider>
    );

    await wait(0); // wait for response
    wrapper.update();
    expect(mountToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(UserTable)).toHaveLength(1);
  });
});
