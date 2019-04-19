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
          <td
            v-for="(column, index) in columns"
            @dblclick="openActiveSession(row)"
            :key="index"
          >{{ row[column.field] }}</td>
        </TableRow>
      </tbody>
    </Table>
    <template v-if="isActiveSessionOpen">
      <active-session
        :is-open="isActiveSessionOpen"
        :session="activeSession"
        :close="closeActiveSession"
      />
    </template>
  </div>
</template>

<script>
import { Table, TableRow, ColumnTitle } from './Styled';
import ActiveSession from './ActiveSession';

export default {
  name: 'SessionTable',
  data() {
    return {
      activeSession: null,
      isActiveSessionOpen: false,
    };
  },
  props: {
    columns: Array,
    data: Array,
  },
  components: {
    Table,
    TableRow,
    ColumnTitle,
    ActiveSession,
  },
  methods: {
    openActiveSession(session) {
      this.isActiveSessionOpen = true;
      this.activeSession = session;
    },
    closeActiveSession() {
      this.isActiveSessionOpen = false;
      this.activeSession = null;
    },
  },
};
</script>
