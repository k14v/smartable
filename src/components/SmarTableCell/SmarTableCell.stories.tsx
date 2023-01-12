// Core
import React from 'react';
// Storybook
import { StoryFn, Meta } from '@storybook/react';
// Components
import SmarTableCell from './SmarTableCell';


const Template: StoryFn<typeof SmarTableCell> = (args) => (
  <SmarTableCell {...args} />
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
  title: 'Example/SmarTableCell',
  component: SmarTableCell,
} as Meta<typeof SmarTableCell>;
