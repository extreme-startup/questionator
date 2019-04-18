<template>
  <SessionContainer>
    <ButtonList>
      <Button @click.stop="openDialog">New Session</Button>
    </ButtonList>
    <ManageSessionTable :columns="columns" :data="sessions" />
    <div v-if="isFetching">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <ConfigDialog
      :agree="createNewSession"
      :disagree="closeDialog"
      :is-open="isDialogOpen"
      :title="dialogTitle"
    />
  </SessionContainer>
</template>

<script>
import { Button } from '@/common/styledComponents';
import * as dateUtils from '../utils/date-formatter.js';
import ManageSessionTable from './ManageSessionTable';
import ConfigDialog from '../components/ConfigDialog';
import { SessionContainer, ButtonList } from './Styled';

const sessionTableConfig = [
  { field: 'startedTime', title: 'Date' },
  { field: 'status', title: 'Status' },
  { field: 'members', title: 'Members' },
  { field: 'trainerName', title: 'Trainer' },
];

const dialogTitle = 'Do you want to create a new session?';

export default {
  name: 'manage-session',
  components: {
    Button,
    ManageSessionTable,
    ButtonList,
    SessionContainer,
    ConfigDialog,
  },
  data: () => ({
    columns: sessionTableConfig,
    isDialogOpen: false,
    dialogTitle: dialogTitle,
  }),
  computed: {
    sessions: function() {
      const sessions = [...this.$store.getters['session/sessions']];

      return sessions.map(session => {
        session.startedTime = session.startedTime ? dateUtils.toLocalDate(session.startedTime) : '';

        session.trainerName = session.trainer.email;
        return session;
      });
    },
    isFetching: function() {
      return this.$store.getters['session/sessionsFetchingStatus'].isFetching;
    },
    error: function() {
      return this.$store.getters['session/sessionsFetchingStatus'].error;
    },
  },
  methods: {
    createNewSession() {
      this.closeDialog();

      this.$store.dispatch('session/addSession', {
        trainer: this.$store.state.user.id,
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
    this.$store.dispatch('session/getSessions');
  },
};
</script>
