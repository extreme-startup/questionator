<template>
  <SessionContainer>
    <ButtonList>
      <v-btn color="info" @click.stop="openDialog">New Session</v-btn>
    </ButtonList>
    <ContestSessionTable :columns="columns" :data="sessions" />
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
import ContestSessionTable from './ContestSessionTable';
import ConfirmDialog from '../components/ConfirmDialog';
import { SessionContainer, ButtonList } from './Styled';

const sessionTableConfig = [
  { field: 'startedTime', title: 'Date' },
  { field: 'status', title: 'Status' },
  { field: 'playersCount', title: 'Members' },
  { field: 'trainerName', title: 'Trainer' },
];

const dialogTitle = 'Do you want to create a new session?';

export default {
  name: 'manage-session',
  components: {
    ContestSessionTable,
    ButtonList,
    SessionContainer,
    ConfirmDialog,
  },
  data: () => ({
    columns: sessionTableConfig,
    isDialogOpen: false,
    dialogTitle: dialogTitle,
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
  },
  mounted() {
    this.$store.dispatch('contestSession/getSessions', { contest: this.$route.params.id });
  },
};
</script>
