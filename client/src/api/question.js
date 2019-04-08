import Vue from 'vue';

export const getQuestions = contestId => Vue.axios.get(`/contest/${contestId}/questions`);
export const addQestion = question => Vue.axios.post('/questions', question);
