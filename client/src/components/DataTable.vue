<template>
  <v-card>
    <v-data-table
      :headers="columns"
      :items="data"
      class="elevation-1"
      :loading="loading"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.text }}</td>
        <td class="text-md-right">{{ props.item.value }}</td>
        <td class="text-xs-right">
          <v-btn
            :disabled="props.item.isDeleted"
            @click="showEditDialog($event, props.item)"
            flat
            icon
          >
            <v-icon small>edit</v-icon>
          </v-btn>
          <v-btn
            :disabled="props.item.isDeleted"
            @click="showDeleteDialog($event, props.item)"
            flat
            icon
          >
            <v-icon small>delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template v-slot:no-data>
        <v-alert :value="error" color="error" icon="warning">
          Sorry, something went wrong
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    columns: Array,
    data: Array,
    loading: Boolean,
    error: Object,
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
