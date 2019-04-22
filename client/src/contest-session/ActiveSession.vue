<template>
  <v-container>
    <v-layout row>
      <v-flex md2>
        <v-btn @click="backToWorkshop">Back to workshop</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md2>
        <v-card-text class="headline font-weight-black">Session#{{ session.id }}</v-card-text>
      </v-flex>
      <v-flex md8>
        <v-card-text class="subheading">{{ session.status }}</v-card-text>
      </v-flex>
      <v-flex md3 align="right">
        <v-card-text class="subheading">Trainer: {{ session.trainer.email }}</v-card-text>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md6>
        <v-text-field readonly value="session.link" id="activeSessionLinkId" type="text" />
      </v-flex>
      <v-flex md2>
        <v-btn v-on:click="copyGeneratedLink" dark>COPY LINK</v-btn>
      </v-flex>
    </v-layout>
    <v-layout v-if="copyLinkErrorMessage" row>
      <div error>{{ copyLinkErrorMessage }}</div>
    </v-layout>
    <v-layout row>
      <v-flex xl3>
        <v-btn dark @click="startActiveSession">START SESSION</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xl12>
        <LeaderBoard />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md3 subheading font-weight-bold>Members</v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <contenders-table :sessionId="session.id" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContendersTable from '../contenders/ContendersTable';
import LeaderBoard from '@/contest-session/LeaderBoard.vue';

export default {
  name: 'active-session',
  data() {
    return { copyLinkErrorMessage: '' };
  },
  computed: {
    session: function() {
      return this.$store.getters['session/activeSession'];
    },
  },
  components: { ContendersTable, LeaderBoard },
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
      this.$store.dispatch('session/startSession', this.session.id);
    },
    backToWorkshop() {
      // !TODO! - replace with real training id
      const trainingId = 1;
      this.$router.push(`/training/${trainingId}`);
    },
  },
};
</script>
