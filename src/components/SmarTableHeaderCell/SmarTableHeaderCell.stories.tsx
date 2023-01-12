// Core
import React from 'react';
// Storybook
import { StoryFn, Meta } from '@storybook/react';
// Components
import SmarTableHeaderCell from './SmarTableHeaderCell';

const TestComponents = () => <div>Hello World</div>

const Template: StoryFn<typeof SmarTableHeaderCell> = (args) => (
  <SmarTableHeaderCell {...args} />
);

const row = {
    id: '872334fd',
    name: 'Screw',
    price: 10,
    amount: 1,
    meta: {
        foo: 'bar',
        bar: 'foo'
    }
}

export const ValueFormatter = Template.bind({});

ValueFormatter.args = {
  row,
  column: {
    field: 'price',
    valueFormatter: ({ value }) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
    }).format(value)
  },
};

export const ComplexValues = Template.bind({});

ComplexValues.args = {
  row,
  column: {
    field: ({ row }) => `${row.name}/${row.amount}`,
  },
};

export const Dense = Template.bind({});

Dense.args = {
  dense: true,
  row,
  column: {
    field: 'id',
  },
};

export default {
  title: 'Example/SmarTableHeaderCell',
  component: TestComponents,
} as Meta<typeof SmarTableHeaderCell>;
