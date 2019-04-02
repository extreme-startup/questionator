import Vue from 'vue';

export const getQuestions = () => Vue.axios.get(`/question`);
export const addQestion = question => Vue.axios.post('/question', question);
