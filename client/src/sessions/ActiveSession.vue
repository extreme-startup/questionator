<template>
  <v-dialog v-model="isOpen" full-width persistent>
    <v-card>
      <v-container>
        <v-layout row justify-space-between>
          <v-flex md5 class="title font-weight-black">
            <v-card-text>Questionaire</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-text-field placeholder="Search" />
          </v-flex>
          <v-flex md2 subheading align-self-end>
            <v-card-text>Profile</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex md2>
            <v-btn @click="close">Back to workshop</v-btn>
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
            <div>
              <!-- This is the leaderboard placeholder -->
            </div>
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
    </v-card>
  </v-dialog>
</template>

<script>
import ContendersTable from '../contenders/ContendersTable';

export default {
  name: 'active-session',
  data() {
    return { copyLinkErrorMessage: '' };
  },
  props: {
    isOpen: Boolean,
    close: Function,
    session: {
      id: String,
      trainerName: String,
      status: String,
      link: String,
    },
  },
  components: { ContendersTable },
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
  },
};
</script>
