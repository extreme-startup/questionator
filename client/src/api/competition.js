import Vue from 'vue';

export const registerInCompetition = ({ userId, sessionId, url, nickname }) =>
  Vue.axios.post('/contest-sessions/add-player', { userId, sessionId, url, nickname });
