<template>
  <v-container>
    <v-layout row>
      <v-flex md2>
        <v-btn @click="backToWorkshop">Back to workshop</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md7>
        <v-card-text class="headline font-weight-black">Session#{{ sessionId }}</v-card-text>
      </v-flex>
      <v-flex md2>
        <v-card-text class="subheading">{{ activeSession.status }}</v-card-text>
      </v-flex>
      <v-flex md3 align="right">
        <v-card-text class="subheading">Trainer: {{ activeSession.trainerName }}</v-card-text>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md7>
        <v-text-field readonly v-model="sessionLink" id="activeSessionLinkId" type="text" />
      </v-flex>
      <v-flex md2>
        <v-btn v-on:click="copyGeneratedLink" dark>COPY LINK</v-btn>
      </v-flex>
    </v-layout>
    <v-layout v-if="copyLinkErrorMessage" row>
      <div error>{{ copyLinkErrorMessage }}</div>
    </v-layout>
    <v-layout row v-if="!isCompleted">
      <v-flex xl3 v-if="!isStarted">
        <v-btn dark @click="startActiveSession">START SESSION</v-btn>
      </v-flex>
      <v-flex xl2 v-if="isStarted">
        <v-btn dark @click="pauseActiveSession">PAUSE SESSION</v-btn>
      </v-flex>
      <v-flex xl2 v-if="isStarted || isPaused">
        <v-btn dark @click="stopActiveSession">STOP SESSION</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xl12>
        <LineChart :chart-data="{ datasets: answeredQuestions }"></LineChart>
      </v-flex>
    </v-layout>
    <v-layout row mt-4>
      <v-flex md3 title font-weight-bold>Members</v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <contenders-table :contenders="contenders" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LineChart from './LineChart';
import ContendersTable from './ContendersTable';

export default {
  name: 'active-session',
  data() {
    return { copyLinkErrorMessage: '' };
  },
  computed: {
    activeSession() {
      const activeSession = { ...this.$store.getters['activeSession/getActiveSession'] };
      activeSession.trainerName =
        activeSession.contest.trainer ? activeSession.contest.trainer.email : '';
      return activeSession;
    },
    contenders() {
      return this.$store.getters['activeSession/contenders'];
    },
    answeredQuestions() {
      return this.$store.getters['activeSession/accumulatedAnsweredQuestions'];
    },
    isFetching() {
      return this.$store.getters['activeSession/getActiveSessionFetchingStatus'].isFetching;
    },
    error() {
      return this.$store.getters['activeSession/getActiveSessionFetchingStatus'].error;
    },
    sessionLink() {
      return `${window.location.origin}/participate/${this.activeSession.id}`;
    },
    isStarted() {
      return this.$store.getters['activeSession/getIsSessionStarted'];
    },
    isPaused() {
      return this.$store.getters['activeSession/getIsSessionPaused'];
    },
    isCompleted() {
      return this.$store.getters['activeSession/getIsSessionCompleted'];
    },
  },
  mounted() {
    this.$store.dispatch('activeSession/getActiveSession', this.sessionId);
    this.$store.dispatch('activeSession/startPollingActiveSession', this.sessionId);
  },
  destroyed() {
    this.$store.dispatch('activeSession/stopPollingActiveSession');
  },
  props: {
    sessionId: String,
  },
  components: { ContendersTable, LineChart },
  methods: {
    copyGeneratedLink() {
      try {
        document.getElementById('activeSessionLinkId').select();
        const isCopied = document.execCommand('copy');
        if (!isCopied) {
          throw new Error();
        }
      } catch (err) {
        this.copyLinkErrorMessage = `We were unable to copy the link. Please, copy it manually`;
      }
    },
    startActiveSession() {
      this.$store.dispatch('activeSession/startActiveSession');
    },
    pauseActiveSession() {
      this.$store.dispatch('activeSession/pauseActiveSession');
    },
    stopActiveSession() {
      this.$store.dispatch('activeSession/stopActiveSession');
    },
    backToWorkshop() {
      this.$router.go(-1);
    },
  },
};
</script>
