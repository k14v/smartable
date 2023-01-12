// Core
import React from 'react';
// Storybook
import { StoryFn, Meta } from '@storybook/react';
// Components
import SmarTableColumn from './SmarTableColumn';
import SmarTableCell from 'components/SmarTableCell';


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

const Template: StoryFn<typeof SmarTableColumn> = ({
    column,
    ...restArgs
}) => (
  <SmarTableColumn column={column} {...restArgs}>
        <SmarTableCell column={column} row={row}/>
    </SmarTableColumn>
);

export const ValueFormatter = Template.bind({});

ValueFormatter.args = {
  column: {
    field: 'id',
  }
};

export default {
  title: 'Example/SmarTableColumn',
  component: SmarTableColumn,
} as Meta<typeof SmarTableColumn>;
