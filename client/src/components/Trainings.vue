<template>
  <styled-wrapper>
    <styled-title>
      Trainings
      <styled-button v-on:click="openCompetitionModal">Add new training</styled-button>
      <styled-sort-link href="/">Sort by: ???</styled-sort-link>
    </styled-title>
    <styled-list>
      <styled-list-item v-for="competition in competitions" v-bind:key="competition.id">
        <router-link v-if="!competition.isDeleted" v-bind:to="'/training/' + competition.id">
          <styled-list-title>
            {{ competition.name }}
          </styled-list-title>
        </router-link>
        <styled-list-title v-if="competition.isDeleted">
          {{ competition.name }}
        </styled-list-title>
        <styled-div>
          {{ competition.description }}
        </styled-div>
        <button v-on:click="deleteCompetition(competition.id)" :disabled="competition.isDeleted">
          delete
        </button>
      </styled-list-item>
    </styled-list>
    <CompetitionDetailsModal
      v-if="isCompetitionModalVisible"
      v-on:close="onCompetitionModalClose"
    />
  </styled-wrapper>
</template>

<script>
import styled from 'vue-styled-components';
import {
  Button,
  TitleH1,
  Section,
  List,
  ListItem,
  ListItemTitle,
} from '../common/styledComponents';
// eslint-disable-next-line max-len
import CompetitionDetailsModal from '../competition/competition-details-modal/CompetitionDetailsModal';

const Title = styled(TitleH1)`
  margin: 0 0 25px;
  display: flex;
  align-items: center;
`;

const AddTraining = styled(Button)`
  margin-left: 45px;
`;

const ListDiv = styled.div`
  margin-bottom: 8px;
`;

const SortLink = styled.a`
  margin-left: auto;
  color: var(--text-color);
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
`;

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
    'styled-wrapper': Section,
    'styled-button': AddTraining,
    'styled-title': Title,
    'styled-list': List,
    'styled-list-item': ListItem,
    'styled-sort-link': SortLink,
    'styled-list-title': ListItemTitle,
    'styled-div': ListDiv,
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

      this.$http
        .post('/contest', competitionDetails)
        .then(() => alert('Competition is created!'))
        .then(() => this.getCompetitions());
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
