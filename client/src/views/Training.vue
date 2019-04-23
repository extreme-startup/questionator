<template>
  <v-app>
    <Header>
      <v-layout align-center>
        <v-chip color="white" text-color="cyan">
          <h4 class="title font-weight-medium cayn--text">Training #{{ $route.params.id }}</h4>
          <v-btn icon small @click="editTraining">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon small @click="deleteTraining($route.params.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-chip>
      </v-layout>
    </Header>
    <v-card color="grey lighten-4" height="100%" flat>
      <TabbedPanel :tabs="tabs" />
    </v-card>
    <ConfirmCompetitionDeletionModal ref="confirm"> </ConfirmCompetitionDeletionModal>
    <CompetitionDetailsModal ref="trainingDetailsModal"> </CompetitionDetailsModal>
  </v-app>
</template>

<script>
import TabbedPanel from '@/components/TabbedPanel.vue';
import Header from '@/components/Header.vue';
// eslint-disable-next-line max-len
import ConfirmCompetitionDeletionModal from '../competition/confirm-competition-delete-modal/ConfirmCompetitionDeleteModal';
// eslint-disable-next-line max-len
import CompetitionDetailsModal from '../competition/competition-details-modal/CompetitionDetailsModal';

export default {
  name: 'training',
  components: {
    TabbedPanel,
    Header,
    ConfirmCompetitionDeletionModal,
    CompetitionDetailsModal,
  },
  data: function() {
    return {
      tabs: ['Questions', 'Sessions'],
    };
  },
  computed: {
    training: function() {
      return this.$store.getters['training/trainings'].find(
        item => item.id === parseInt(this.$route.params.id),
        10,
      );
    },
  },

  mounted() {
    this.$store.dispatch('training/getTrainings');
  },

  methods: {
    deleteTraining: async function(id) {
      const isConfirmed = await this.$refs.confirm.open();
      if (isConfirmed) {
        await this.$store.dispatch('training/deleteTraining', id);
        this.$router.back();
      }
    },
    editTraining: async function() {
      const trainingDetails = await this.$refs.trainingDetailsModal.open(this.training);
      if (trainingDetails) {
        this.$store.dispatch('training/editTraining', trainingDetails);
      }
    },
  },
};
</script>
