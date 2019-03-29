import * as React from "react";
import { Modal, Form, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { BankUser, BankUserInput } from "../../config/types";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import "./styles.css";

interface IStep {
  title: string;
  content: React.ReactNode;
}

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

class UserFormComponent extends React.Component<IProps, IState> {
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
    const { visible, user, onOk, onCancel, form } = this.props;
    const { curStep } = this.state;

    const steps: Array<IStep> = [
      {
        title: "Bank Info",
        content: <Step1 form={form} user={user} />
      },
      {
        title: "Account Info",
        content: <Step2 form={form} user={user} />
      },
      {
        title: "Employee Info",
        content: <Step3 form={form} user={user} />
      }
    ];
    return (
      <Modal
        title={user ? "Edit User" : "Add User"}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form>
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={i === curStep ? "foo fade-in" : "foo"}
            >
              {step.content}
            </div>
          ))}
          <div className="steps-action">
            {curStep < steps.length - 1 && (
              <Button onClick={() => this.next()}>Next</Button>
            )}
            {curStep > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    );
  }
}

const UserForm = Form.create({ name: "form_user" })(UserFormComponent);

export { UserForm };

export default UserForm;
