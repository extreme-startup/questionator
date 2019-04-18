<template>
  <Table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.title">
          <ColumnTitle>
            {{ column.title }}
          </ColumnTitle>
        </th>
      </tr>
    </thead>
    <tbody>
      <TableRow v-for="row in data" :key="row.id">
        <td v-for="(column, index) in columns" @dblclick="goToSession($event, row)" :key="index">
          {{ row[column.field] }}
        </td>
      </TableRow>
    </tbody>
  </Table>
</template>

<script>
import { Table, TableRow, ColumnTitle } from './ManageSession.styled';

export default {
  name: 'SessionTable',
  props: {
    columns: Array,
    data: Array,
  },
  components: {
    Table,
    TableRow,
    ColumnTitle,
  },
  methods: {
    goToSession() {},
  },
};
</script>
