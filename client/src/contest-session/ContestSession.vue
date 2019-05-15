<template>
  <SessionContainer>
    <ButtonList>
      <v-btn color="info" @click.stop="createNewSession">New Session</v-btn>
    </ButtonList>
    <v-data-table
      :headers="headers"
      :items="sessions"
      :hide-actions="true"
      :sort-icon="null"
      class="body-2 bordered"
    >
      <template v-slot:items="props">
        <tr class="" @click.stop="openActiveSession(props.item)">
          <td class="subheading">{{ props.item.startedTime }}</td>
          <td class="subheading">{{ props.item.status }}</td>
          <td class="subheading">{{ props.item.players.length }}</td>
          <td class="subheading">{{ props.item.trainerName }}</td>
        </tr>
      </template>
    </v-data-table>
    <div v-if="isFetching">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </SessionContainer>
</template>

<script>
import * as dateUtils from '../utils/date-formatter.js';
import { SessionContainer, ButtonList } from './Styled';

const dialogTitle = 'Do you want to create a new session?';

export default {
  name: 'manage-session',
  components: {
    ButtonList,
    SessionContainer,
  },
  data: () => ({
    isDialogOpen: false,
    dialogTitle: dialogTitle,
    headers: [
      { text: 'Data', class: 'title', sortable: false },
      { text: 'Status', value: 'status', class: 'title', sortable: false },
      { text: 'Members', value: 'playersCount', class: 'title', sortable: false },
      { text: 'Trainer', value: 'trainerName', class: 'title', sortable: false },
    ],
  }),
  computed: {
    sessions: function() {
      const sessions = [...this.$store.getters['contestSession/sessions']];

      return sessions.map(session => {
        session.startedTime = session.startedTime ? dateUtils.toLocalDate(session.startedTime) : '';
        session.playersCount = session.players.length;
        session.trainerName = session.contest.trainer ? session.contest.trainer.email : '';
        return session;
      });
    },
    isFetching: function() {
      return this.$store.getters['contestSession/sessionsFetchingStatus'].isFetching;
    },
    error: function() {
      return this.$store.getters['contestSession/sessionsFetchingStatus'].error;
    },
  },
  methods: {
    createNewSession() {
      this.$store.dispatch('contestSession/addSession', {
        contest: this.$route.params.id,
      });
    },
    openActiveSession(session) {
      this.$router.push(`/training-session/${session.id}`);
    },
  },
  mounted() {
    this.$store.dispatch('contestSession/getSessions', { contest: this.$route.params.id });
  },
};
</script>
