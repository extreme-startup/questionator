<template>
  <Table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.title">
          <ColumnTitle>
            {{ column.title }}
          </ColumnTitle>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <TableRow v-for="row in data" :key="row.id" :deleted="row.isDeleted">
        <td v-for="(column, index) in columns" @dblclick="showEditDialog($event, row)" :key="index">
          {{ row[column.field] }}
        </td>
        <td>
          <EditLink :deleted="row.isDeleted" @click.prevent="showEditDialog($event, row)" href="#">
            edit
          </EditLink>
          <DeleteLink
            :deleted="row.isDeleted"
            @click.prevent="showDeleteDialog($event, row)"
            href="#"
          >
            delete
          </DeleteLink>
        </td>
      </TableRow>
    </tbody>
  </Table>
</template>

<script>
import styled from 'vue-styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    border: solid 1px var(--btn-bg);
  }

  th {
    font-size: 1.2rem;
    text-align: left;
    font-weight: 500;
  }

  td {
    padding: 12px 8px;
    border-bottom: 1px solid var(--btn-bg);
    background-color: var(--bg);
    user-select: none;

    &:first-child {
      width: 60%;
    }

    &:last-child {
      width: 20%;
      text-align: center;
    }
  }

  td > a {
    text-decoration: none;
    font-size: 12px;
  }
`;

const TableRowProps = { deleted: Boolean };
const TableRow = styled('tr', TableRowProps)`
  opacity: ${props => (props.deleted ? 0.3 : 1)};
  cursor: default;
`;

const ColumnTitle = styled.div`
  padding: 8px;
`;

const EditLink = styled('a', TableRowProps)`
  margin-right: 5px;
  color: blue;
  cursor: ${props => (props.deleted ? 'default' : 'pointer')};
`;

const DeleteLink = styled('a', TableRowProps)`
  margin-left: 5px;
  color: red;
  cursor: ${props => (props.deleted ? 'default' : 'pointer')};
`;

export default {
  name: 'DataTable',
  props: {
    columns: Array,
    data: Array,
  },
  components: {
    Table,
    TableRow,
    ColumnTitle,
    EditLink,
    DeleteLink,
  },
  methods: {
    showEditDialog(e, item) {
      this.showForm(item, 'edit');
    },
    showDeleteDialog(e, item) {
      this.showForm(item, 'delete');
    },
    showForm(item, type) {
      if (item.isDeleted) {
        return;
      }
      this.$store.dispatch('form/showForm', { payload: item, type });
    },
  },
};
</script>
