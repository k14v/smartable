import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Checkbox from "./Checkbox";

export default {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    label: { control: "text" },
    onChange: { action: "onChange" },
    checked: { control: "boolean" },
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => {
  return <Checkbox {...args} />;
};

export const CheckboxComponent = Template.bind({});
