// Core
import React from 'react';
// Storybook
import { StoryFn, Meta } from '@storybook/react';
// Components
import SmarTableHeader from './SmarTableHeader';


const Template: StoryFn<typeof SmarTableHeader> = (args) => (
  <SmarTableHeader {...args} />
);

const rows = [{
  id: '872334fd',
  name: 'Screw',
  price: 10,
  amount: 1,
  meta: {
      foo: 'bar',
      bar: 'foo'
  }
}, {
  id: '872334fd',
  name: 'Banana',
  price: 2.50,
  amount: 5,
  meta: {
      foo: 'bar',
      bar: 'foo'
  }
}, {
  id: '872334fd',
  name: 'Ferrari',
  price: 100,
  amount: 1,
  meta: {
      foo: 'bar',
      bar: 'foo'
  }
}]

export const ValueFormatter = Template.bind({});

ValueFormatter.args = {
  rows,
  columns: [{
    field: 'id',
  }, {
    field: ({ row }) => `${row.name} / ${row.amount}`,
  },{
    field: 'price',
    valueFormatter: ({ value }) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
    }).format(value)
  }],
};

export default {
  title: 'Example/SmarTableHeader',
  component: SmarTableHeader,
} as Meta<typeof SmarTableHeader>;
