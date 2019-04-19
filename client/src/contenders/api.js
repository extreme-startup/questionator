import Vue from 'vue';

// TODO: replace this ones we have some backend method to get
// all the users
// 1) regisered for a given session
// 2) that are contenders for a given session
export const getContenders = sessionId =>
  Vue.axios.get(`/users?contender=true&sessionId=${sessionId}`);
