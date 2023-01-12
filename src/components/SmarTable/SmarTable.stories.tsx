// Core
import React from 'react';
// Storybook
import { StoryFn, Meta } from '@storybook/react';
// Components
// import SmarTable, { SmarTableProps } from '.';
import SmarTableCell, { SmarTableCellProps } from 'components/SmarTableCell';


const rows = new Array(50).fill(null).map((_, idx) => ({
  id: idx + 1,
  reference: `PO ${Math.trunc(Math.random() * 1000)}`,
  notified: new Date(),
  amount: `${(Math.random() * 100).toFixed(2)} €`,
  priority: ['Media', 'Baja', 'Alta'][Math.trunc(Math.random() * 100) % 3],
  status: ['Presupuesto asignado', 'Presupuesto pendiente'][Math.trunc(Math.random() * 100) % 2],
  empresa_talk: ['Aprobado y finalizado', 'En curso'][Math.trunc(Math.random() * 100) % 2],
  proveedor_talk: ['Aprobado y finalizado', 'En curso'][Math.trunc(Math.random() * 100) % 2],
  proveedor: 'Fontanería Carlo…'
}));

// const columns: SmarTableProps<(typeof rows)[number]>['columns'] = [{
//   field: 'id',
//   headerName: 'Referencia',
//   width: 150,
//   sortable: true,
//   draggable: true,
//   valueFormatter: ({ value }) => `${value}`,
//   renderCell: ({ formattedValue }) => <span>{formattedValue}</span>
// }, {
//   field: () => ({ foo: 'bar' }),
//   headerName: 'Referencia',
//   width: 150,
//   sortable: true,
//   draggable: true,
//   // @ts-ignore
//   valueFormatter: ({ value, column }) => value.foo
// }, {
//   field: 'notified',
//   headerName: 'Notificado',
//   width: 150,
//   sortable: true,
//   resizable: true
// }, {
//   field: 'amount',
//   headerName: 'Importe',
//   width: 150,
//   sortable: true,
//   resizable: true
// }, {
//   field: 'priority',
//   headerName: 'Prioridad',
//   width: 150,
//   sortable: true,
//   resizable: true
// }, {
//   field: 'status',
//   headerName: 'Estado',
//   width: 150,
//   sortable: true,
//   resizable: true
// }, {
//   field: 'empresa_talk',
//   headerName: 'Conversación Empresa',
//   width: 150,
//   sortable: true,
//   resizable: true
// }, {
//   field: 'proveedor_talk',
//   headerName: 'Conversación proveedor',
//   width: 150,
//   sortable: true,
//   resizable: true
// }, {
//   field: 'proveedor',
//   headerName: 'proveedor',
//   width: 150,
//   sortable: true,
//   resizable: true
// }];

// const Template: StoryFn<any> = (args) => (
//   <SmarTable {...args} />
// );

const TestComponents = () => <div>Hello World</div>

const Template: StoryFn<typeof SmarTableCell> = (args) => (
  <SmarTableCell {...args} />
);

export const Default = Template.bind({});

Default.args = {
  row: {
    id: 'test'
  },
  column: {
    field: 'id'
  },
};

export default {
  title: 'Example/SmarTable',
  component: TestComponents,
} as Meta<typeof SmarTableCell>;
