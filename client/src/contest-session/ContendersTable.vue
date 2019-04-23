<template>
  <div>
    <v-data-table
            :headers="headers"
            :items="computedContenders"
            :hide-actions="true"
            :sort-icon="null"
            class="body-2 bordered"
    >
      <template v-slot:items="props">
        <td class="subheading">{{ props.item.email }}</td>
        <td class="subheading">{{ props.item.score }}</td>
        <td class="subheading">{{ props.item.place }}</td>
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
        { text: 'Name', value: 'name', class: 'title', sortable: true },
        { text: 'Score', value: 'score', class: 'title', sortable: true },
        { text: 'Place', value: 'place', class: 'title', sortable: true },
      ],
    };
  },
  props: {
    contenders: Array,
  },
  computed: {
    computedContenders() {
      const contenders = this.contenders || [];
      const sortedContenders = contenders.sort(this.sortByScore);
      return this.contenders.map(contender => ({
        ...contender,
        place: sortedContenders.findIndex(({ id }) => id === contender.id),
      }));
    },
  },
  methods: {
    sortByScore(contender1, contender2) {
      return contender1.score > contender2.score;
    },
  },
};
</script>
