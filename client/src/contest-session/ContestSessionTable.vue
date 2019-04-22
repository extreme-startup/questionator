<template>
  <div>
    <Table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.title">
            <ColumnTitle>{{ column.title }}</ColumnTitle>
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRow v-for="row in data" :key="row.id" v-on:click.stop="openActiveSession(row)">
          <td v-for="(column, index) in columns" @dblclick="openActiveSession(row)" :key="index">
            {{ row[column.field] }}
          </td>
        </TableRow>
      </tbody>
    </Table>
  </div>
</template>

<script>
import { Table, TableRow, ColumnTitle } from './Styled';

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
    openActiveSession(session) {
      this.$router.push(`/training-session/${session.id}`);
    },
  },
};
</script>
