import Vue from 'vue';

export const registerInCompetition = ({ playerId, sessionId, playerName }) =>
  Vue.axios.post('/contest-sessions/add-player', { playerId, sessionId, playerName });
