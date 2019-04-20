import Vue from 'vue';

export const registerInCompetition = ({ sessionHash, memberId, clientURL, nickname }) =>
  Vue.axios.post('/manage-session/add-member', { sessionHash, memberId, clientURL, nickname });
