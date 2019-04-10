<template>
  <section>
    <v-container grid-list-md>
      <h2>
        Trainings
        <v-btn color="info" v-on:click="openCompetitionModal">Add new training</v-btn>
        <a href="/">Sort by: ???</a>
      </h2>

      <v-layout row wrap>
        <v-flex xs4 v-for="competition in competitions" v-bind:key="competition.id">
          <v-card>
            <v-card-title>
              <router-link v-if="!competition.isDeleted" v-bind:to="'/training/' + competition.id">
                <styled-list-title>
                  {{ competition.name }}
                </styled-list-title>
              </router-link>

              <styled-list-title v-if="competition.isDeleted">
                {{ competition.name }}
              </styled-list-title>
            </v-card-title>

            <v-card-text>
              {{ competition.description }}
            </v-card-text>

            <v-btn
              color="error"
              v-on:click="deleteCompetition(competition.id)"
              :disabled="competition.isDeleted"
            >
              delete
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>

      <CompetitionDetailsModal
        v-if="isCompetitionModalVisible"
        v-on:close="onCompetitionModalClose"
      />
    </v-container>
  </section>
</template>

<script>
// eslint-disable-next-line max-len
import CompetitionDetailsModal from '../competition/competition-details-modal/CompetitionDetailsModal';

export default {
  name: 'Trainings',
  data: function() {
    return {
      isCompetitionModalVisible: false,
      competitions: [],
    };
  },
  created: function() {
    this.getCompetitions();
  },
  components: {
    CompetitionDetailsModal,
  },
  methods: {
    openCompetitionModal: function() {
      this.isCompetitionModalVisible = true;
    },
    onCompetitionModalClose: function(competitionDetails) {
      this.isCompetitionModalVisible = false;
      if (!competitionDetails) {
        return;
      }

      this.$http.post('/contest', competitionDetails).then(() => this.getCompetitions());
    },
    deleteCompetition: function(id) {
      return this.$http(`/contest/${id}`, {
        method: 'PUT',
        data: { isDeleted: true },
      }).then(() => this.getCompetitions());
    },
    getCompetitions: function() {
      this.$http.get('/contest').then(response => (this.competitions = response.data));
    },
  },
};
</script>
