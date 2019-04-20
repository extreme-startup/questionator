<template>
  <div>
    <Header />
    <Section>
      <v-layout row align-content-space-between justify-center>
        <v-flex class="v-p-">
          <h1 class="display-3">Training #{{ $route.params.id }}</h1>
        </v-flex>

        <v-flex align-self-center class="text-sm-right">
          <v-btn color="error"
            @click="deleteCompetition($route.params.id)">
            delete
          </v-btn>

          <v-btn color="primary">
            edit
          </v-btn>
        </v-flex>

      </v-layout>
      <TabbedPanel :tabs="tabs" />
    </Section>

    <ConfirmCompetitionDeletionModal ref="confirm">
    </ConfirmCompetitionDeletionModal>
  </div>
</template>

<script>
import TabbedPanel from '@/components/TabbedPanel.vue';
import Header from '@/components/Header.vue';
import { Section } from '@/common/styledComponents';
import { CompetitionDataService } from '../competition/competition-data.service';
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
      competitionDataService: new CompetitionDataService(this.$http),
    };
  },

  methods: {
    deleteCompetition: function(id) {
      this.$refs.confirm.open().then(isConfirmed => {
        if (isConfirmed) {
          return this.competitionDataService
            .deleteCompetition(id)
            .then(() => this.$router.back())
        }
        return null;
      });
    },
  },
};
</script>
