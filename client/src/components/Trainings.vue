<template>
  <section>
    <v-container grid-list-md>
      <h2>
        Trainings
        <v-btn color="info" v-on:click="createCompetition">Add new training</v-btn>
      </h2>

      <v-layout v-if="competitions && competitions.length" row wrap>
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

      <v-layout v-if="!competitions || !competitions.length" row>
        <v-flex>
          <v-card>
            <v-card-title>
              You don't have any trainings
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <CompetitionDetailsModal ref="competitionDetailsModal">
      </CompetitionDetailsModal>
      <ConfirmCompetitionDeletionModal ref="confirm">
      </ConfirmCompetitionDeletionModal>
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
    createCompetition: function() {
      this.$refs.competitionDetailsModal.open()
        .then((competitionDetails) => {
          if (!competitionDetails) {
            return;
          }
          return this.competitionDataService
            .createCompetition(competitionDetails)
            .then(competitions => this.onGetCompetitions(competitions));
        });
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
