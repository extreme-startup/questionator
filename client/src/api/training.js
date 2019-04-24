import Vue from 'vue';

const basicUrl = '/contest';

export function createCompetition(competitionDetails) {
  return Vue.axios.post(basicUrl, competitionDetails);
}

export function editTraining(trainingDetails) {
  const params = {
    method: 'PUT',
    data: trainingDetails,
  };

  return Vue.axios(`${basicUrl}/${trainingDetails.id}`, params);
}

export function deleteCompetition(id) {
  const params = {
    method: 'PUT',
    data: { isDeleted: true },
  };

  return Vue.axios(`${basicUrl}/${id}`, params);
}

export function getCompetitions() {
  return Vue.axios.get('/contest');
}
