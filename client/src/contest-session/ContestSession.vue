<template>
  <SessionContainer>
    <ButtonList>
      <v-btn color="info" @click.stop="openDialog">New Session</v-btn>
    </ButtonList>
    <div>
      <v-data-table
        :headers="contestSessionHeaders"
        :items="sessions"
        :hide-actions="true"
        class="body-2 bordered"
      >
        <template v-slot:items="props">
          <tr @dblclick="openContestSession(props.item)">
            <td class="subheading">{{ props.item.startedTime }}</td>
            <td class="subheading">{{ props.item.status }}</td>
            <td class="subheading">{{ props.item.playersCount }}</td>
            <td class="subheading">{{ props.item.trainerName }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <div v-if="isFetching">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <ConfirmDialog
      :agree="createNewSession"
      :disagree="closeDialog"
      :is-open="isDialogOpen"
      :title="dialogTitle"
    />
  </SessionContainer>
</template>

<script>
import * as dateUtils from '../utils/date-formatter.js';
import ConfirmDialog from '../components/ConfirmDialog';
import { SessionContainer, ButtonList } from './Styled';

const dialogTitle = 'Do you want to create a new session?';

export default {
  name: 'manage-session',
  components: {
    ButtonList,
    SessionContainer,
    ConfirmDialog,
  },
  data: () => ({
    isDialogOpen: false,
    dialogTitle: dialogTitle,
    contestSessionHeaders: [
      { text: 'Date', value: 'startedTime', class: 'title', sortable: false },
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
      this.closeDialog();

      this.$store.dispatch('contestSession/addSession', {
        contests: this.$route.params.id,
      });
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    openContestSession(contestSession) {
      this.$router.push(`/contest-session/${contestSession.id}`);
    },
  },
  mounted() {
    this.$store.dispatch('contestSession/getSessions', { contest: this.$route.params.id });
  },
};
</script>
