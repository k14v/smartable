// Core
import React from 'react';
// Storybook
import { StoryFn, Meta } from '@storybook/react';
// Components
import SmarTableColumnDraggable from './SmarTableColumnDraggable';
import SmarTableCell from '../SmarTableCell';
import SmarTableColumn from '../SmarTableColumn';


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

const Template: StoryFn<typeof SmarTableColumnDraggable> = ({
    column,
    ...restArgs
}) => (
  <SmarTableColumnDraggable column={column} {...restArgs}>
    <SmarTableColumn column={column}>
      <SmarTableCell column={column} row={row}/>
    </SmarTableColumn>
  </SmarTableColumnDraggable>
);

export const ValueFormatter = Template.bind({});

ValueFormatter.args = {
  column: {
    field: 'id',
  }
};

export default {
  title: 'Example/SmarTableColumnDraggable',
  component: SmarTableColumnDraggable,
} as Meta<typeof SmarTableColumnDraggable>;
