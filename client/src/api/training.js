import Vue from 'vue';

const basicUrl = '/contest';

export async function createCompetition(competitionDetails) {
  return Vue.axios.post(basicUrl, competitionDetails);
}

export function deleteCompetition(id) {
  const params = {
    method: 'PUT',
    data: { isDeleted: true },
  };

  return Vue.axios(`${basicUrl}/${id}`, params);
}

export const getCompetitions = () => Vue.axios.get('/contest');
