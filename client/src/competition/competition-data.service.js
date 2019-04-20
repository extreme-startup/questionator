export class CompetitionDataService {
  basicUrl = '/contest';

  constructor($http) {
    this.$http = $http;
  }

  createCompetition(competitionDetails) {
    return this.$http.post(this.basicUrl, competitionDetails).then(() => this.getCompetitions());
  }

  deleteCompetition(id) {
    const params = {
      method: 'PUT',
      data: { isDeleted: true },
    };

    return this.$http(`${this.basicUrl}/${id}`, params).then(() => this.getCompetitions());
  }

  getCompetitions() {
    return this.$http.get(this.basicUrl).then(response => response.data);
  }
}
