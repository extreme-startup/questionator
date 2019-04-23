<template>
  <div>
    <div v-if="isFetching">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <v-data-table
      :headers="headers"
      :items="contenders"
      :hide-actions="true"
      :sort-icon="null"
      class="body-2 bordered"
    >
      <template v-slot:items="props">
        <td class="subheading">{{ props.item.email }}</td>
        <td class="subheading">{{ props.item.score }}</td>
        <td class="subheading"></td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'contenders-table',
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', class: 'title', sortable: false },
        { text: 'Score', value: 'score', class: 'title', sortable: true },
        { text: '???', value: '???', class: 'title' },
      ],
    };
  },
  props: {
    contestSessionId: String,
    contensers: Array,
  },
  computed: {
    contenders() {
      return [...this.$store.getters['contenders/getContenders']];
    },
    isFetching: function() {
      return this.$store.getters['contenders/getContendersFetchingStatus'].isFetching;
    },
    error: function() {
      return this.$store.getters['contenders/getContendersFetchingStatus'].error;
    },
  },
  mounted() {
    this.$store.dispatch('contenders/startPollingContenders', this.contestSessionId);
  },
  destroyed() {
    this.$store.dispatch('contenders/stopPollingContenders');
  },
};
</script>
