import * as React from "react";
import { shallow, mount } from "enzyme";
import { Input, Form } from "antd";

import Step2 from "../../UserForm/Step2";
import { BankUserInput } from "../../../config/types";

describe("UserForm/Step2", () => {
  let Step2Form = Form.create<BankUserInput>()(Step2);

  it("renders without error", () => {
    shallow(<Step2Form />);
  });

  it("should render correctly", async () => {
    const wrapper = mount(<Step2Form />);
    expect(wrapper.find(Input)).toHaveLength(3);
  });
});
