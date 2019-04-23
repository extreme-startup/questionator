<template>
  <section>
    <v-container grid-list-md>
      <h2>
        Ongoing sessions
      </h2>
      <v-layout row wrap>

        <v-flex v-for="session in sessions" :key="session.id" xs3>
          <v-card>
            <router-link v-bind:to="'/training-session/' + session.id">
              <v-card-title><h4>Session #{{ session.id }}</h4></v-card-title>
            </router-link>
            <v-card-text>
              <div>{{ session.players.length }} members</div>
              <div>Trainer </div>
              <div>Start time {{ session.startedTime }}</div>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </section>
</template>

<script>
import * as dateUtils from '../utils/date-formatter.js';

export default {
  name: 'Sessions',
  components: {},
  computed: {
    sessions: function() {
      const sessions =[...this.$store.getters['contestSession/sessions']];
      return sessions.map(session => {
        session.startedTime = session.startedTime ? dateUtils.toLocalDate(session.startedTime) : '';
        return session;
      });
    },
  },
  mounted() {
    this.$store.dispatch('contestSession/getSessions', { status: 'in progress' });
  },
};
</script>
