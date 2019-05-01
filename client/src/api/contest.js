import Vue from 'vue';

export const resultSession = (contestSessionId, time) => {
  return Vue.axios.get(`/results/${contestSessionId}?time=${time}`);
};
