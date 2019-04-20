import Vue from 'vue';

export class CompetitionDataService {
  basicUrl = '/contest';

  createCompetition(competitionDetails) {
    return Vue.axios.post(this.basicUrl, competitionDetails).then(() => this.getCompetitions());
  }

  deleteCompetition(id) {
    const params = {
      method: 'PUT',
      data: { isDeleted: true },
    };

    return Vue.axios.delete(`${this.basicUrl}/${id}`, params).then(() => this.getCompetitions());
  }

  getCompetitions() {
    return Vue.axios.get(this.basicUrl).then(response => response.data);
  }
}
