<template>
  <Table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">
          <ColumnTitle>
            {{ column }}
          </ColumnTitle>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.id">
        <td v-for="item in row" :key="item">{{ item }}</td>
      </tr>
    </tbody>
  </Table>
</template>

<script>
import styled from 'vue-styled-components';

const Table = styled.table`
  width: 100%;

  thead {
    border: solid 1px #4f4f4f;
  }

  th {
    font-size: 1.2rem;
    text-align: left;
  }
`;

const ColumnTitle = styled.div`
  padding: 10px;
`;

export default {
  name: 'DataTable',
  props: {
    columns: Array,
    data: Array,
  },
  components: {
    Table,
    ColumnTitle,
  },
};
</script>
