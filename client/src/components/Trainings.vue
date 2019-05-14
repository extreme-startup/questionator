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
            <v-card-title class="headline">
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

      <CompetitionDetailsModal ref="competitionDetailsModal"></CompetitionDetailsModal>
    </v-container>
  </section>
</template>

<script>
// eslint-disable-next-line max-len
import CompetitionDetailsModal from '../competition/competition-details-modal/CompetitionDetailsModal';

export default {
  name: 'Trainings',
  computed: {
    competitions: function() {
      return this.$store.getters['training/trainings'];
    },
    user: function() {
      return this.$store.getters.userId;
    },
  },
  async mounted() {
    this.$store.dispatch('training/getTrainings');
  },
  components: {
    CompetitionDetailsModal,
  },
  methods: {
    createCompetition: function() {
      this.$refs.competitionDetailsModal.open().then(competitionDetails => {
        if (!competitionDetails) {
          return;
        }
        this.$store.dispatch('training/createTraining', {
          ...competitionDetails,
          userId: this.user,
        });
      });
    },
  },
};
</script>
