<template>
  <div>
    <Header />
    <Section>
      <v-layout row align-content-space-between justify-center>
        <v-flex class="v-p-">
          <h1 class="display-3">Training #{{ $route.params.id }}</h1>
        </v-flex>

        <v-flex align-self-center class="text-sm-right">
          <v-btn color="error" @click="deleteCompetition($route.params.id)">
            delete
          </v-btn>

          <v-btn color="primary">
            edit
          </v-btn>
        </v-flex>
      </v-layout>
      <TabbedPanel :tabs="tabs" />
    </Section>

    <ConfirmCompetitionDeletionModal ref="confirm"> </ConfirmCompetitionDeletionModal>
  </div>
</template>

<script>
import TabbedPanel from '@/components/TabbedPanel.vue';
import Header from '@/components/Header.vue';
import { Section } from '@/common/styledComponents';
// eslint-disable-next-line max-len
import ConfirmCompetitionDeletionModal from '../competition/confirm-competition-delete-modal/ConfirmCompetitionDeleteModal';

export default {
  name: 'training',
  components: {
    TabbedPanel,
    Header,
    Section,
    ConfirmCompetitionDeletionModal,
  },
  data: function() {
    return {
      tabs: ['Questions', 'Sessions'],
    };
  },

  methods: {
    deleteCompetition: async function(id) {
      const isConfirmed = await this.$refs.confirm.open();
      if (isConfirmed) {
        await this.$store.dispatch('training/deleteTraining', id);
        this.$router.back();
      }
    },
  },
};
</script>
