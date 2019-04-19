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
                <h5>
                  {{ competition.name }}
                </h5>
              </router-link>

              <h5 v-if="competition.isDeleted">
                {{ competition.name }}
              </h5>
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

      <ConfirmCompetitionDeletionModal ref="confirm"> </ConfirmCompetitionDeletionModal>
    </v-container>
  </section>
</template>

<script>
// eslint-disable-next-line max-len
import CompetitionDetailsModal from '../competition/competition-details-modal/CompetitionDetailsModal';
// eslint-disable-next-line max-len
import ConfirmCompetitionDeletionModal from '../competition/confirm-competition-delete-modal/ConfirmCompetitionDeleteModal';
import { CompetitionDataService } from '../competition/competition-data.service';

export default {
  name: 'Trainings',
  data: function() {
    return {
      isCompetitionModalVisible: false,
      competitions: [],
      competitionDataService: new CompetitionDataService(this.$http),
    };
  },
  created: function() {
    this.competitionDataService
      .getCompetitions()
      .then(competitions => this.onGetCompetitions(competitions));
  },
  components: {
    CompetitionDetailsModal,
    ConfirmCompetitionDeletionModal,
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
      this.competitionDataService
        .createCompetition(competitionDetails)
        .then(competitions => this.onGetCompetitions(competitions));
    },

    deleteCompetition: function(id) {
      this.$refs.confirm.open().then(isConfirmed => {
        if (isConfirmed) {
          return this.competitionDataService
            .deleteCompetition(id)
            .then(competitions => this.onGetCompetitions(competitions));
        }
        return null;
      });
    },

    onGetCompetitions(competitions) {
      this.competitions = competitions;
    },
  },
};
</script>
