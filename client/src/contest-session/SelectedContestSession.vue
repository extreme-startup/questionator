<template>
  <v-container>
    <v-layout row>
      <v-flex md2>
        <v-btn @click="backToContest">Back to workshop</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md2>
        <v-card-text class="headline font-weight-black"
          >Session#{{ contestSession.id }}</v-card-text
        >
      </v-flex>
      <v-flex md8>
        <v-card-text class="subheading">{{ contestSession.status }}</v-card-text>
      </v-flex>
      <v-flex md3 align="right">
        <v-card-text class="subheading"
          >Trainer:
          {{ contestSession.trainer ? contestSession.trainer.email : ' NO TRAINER' }}</v-card-text
        >
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md6>
        <v-text-field readonly value="contestSession.link" id="contestSessionLinkId" type="text" />
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
        <v-btn dark @click="startContestSession">START SESSION</v-btn>
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
        <contenders-table :contestSessionId="contestSession.id" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContendersTable from '../contenders/ContendersTable';
import LeaderBoard from '@/contest-session/LeaderBoard.vue';

export default {
  name: 'selected-contest-session',
  data() {
    return { copyLinkErrorMessage: '' };
  },
  computed: {
    contestSession: function() {
      return this.$store.getters['contestSession/selectedContestSession'];
    },
  },
  components: { ContendersTable, LeaderBoard },
  methods: {
    copyGeneratedLink() {
      try {
        document.getElementById('contestSessionLinkId').select();
        const isCopied = document.execCommand('copy');
        if (!isCopied) {
          throw new Error();
        }
      } catch (err) {
        this.copyLinkErrorMessage = `We were unable to copy the link. Please, copy it manually`;
      }
    },
    startContestSession() {
      this.$store.dispatch('contestSession/startSession', this.session.id);
    },
    backToContest() {
      // !TODO! - replace with real training id
      const trainingId = 1;
      this.$router.push(`/training/${trainingId}`);
    },
  },
};
</script>
