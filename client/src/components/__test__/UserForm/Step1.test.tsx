import * as React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { Select, Form } from "antd";
import wait from "waait";

import Step1 from "../../UserForm/Step1";
import { GET_BANKS, GET_BRANCHES } from "../../../config/queries";
import { BankUserInput } from "../../../config/types";

const mocks = [
  {
    request: {
      query: GET_BANKS
    },
    result: {
      data: {
        banks: [{ id: "1", name: "test bank" }]
      }
    }
  },
  {
    request: {
      query: GET_BRANCHES
    },
    result: {
      data: {
        branches: [{ id: "1", name: "test branch" }]
      }
    }
  }
];

describe("UserForm/Step1", () => {
  let Step1Form = Form.create<BankUserInput>()(Step1);

  it("renders without error", () => {
    shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Step1Form />
      </MockedProvider>
    );
  });

  it("should render correctly", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Step1Form />
      </MockedProvider>
    );

    await wait(10); // wait for response
    wrapper.update();
    expect(wrapper.find(Select)).toHaveLength(2);
  });
});
