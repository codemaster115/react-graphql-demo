import * as React from "react";
import { shallow, mount } from "enzyme";
import { Input, Form } from "antd";

import Step3 from "../../UserForm/Step3";
import { BankUserInput } from "../../../config/types";

describe("UserForm/Step3", () => {
  let Step3Form = Form.create<BankUserInput>()(Step3);

  it("renders without error", () => {
    shallow(<Step3Form />);
  });

  it("should render correctly", async () => {
    const wrapper = mount(<Step3Form />);
    expect(wrapper.find(Input)).toHaveLength(2);
  });
});
