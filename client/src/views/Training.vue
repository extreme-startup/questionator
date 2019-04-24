<template>
  <v-app>
    <Header />
    <v-card color="grey lighten-4" height="100%" flat>
      <v-toolbar color="cyan" dark tabs>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>
            <v-layout row align-content-space-between justify-center>
                <v-flex class="v-p-">
                    <h1 class="display-3">Training  #{{ $route.params.id }}</h1>
                    <p class="body-1">
                        {{training.description}}
                    </p>
                </v-flex>

                <v-flex align-self-center class="text-sm-right">
                    <v-btn color="error" @click="deleteTraining($route.params.id)">
                        delete
                    </v-btn>

                    <v-btn color="primary" @click="editTraining">
                        edit
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-toolbar-title>
      </v-toolbar>
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
