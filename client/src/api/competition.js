import Vue from 'vue';

export const registerInCompetition = ({ user, contestSession, url, nickname }) =>
  Vue.axios.post('/contest-sessions/add-Player', { user, contestSession, url, nickname });
