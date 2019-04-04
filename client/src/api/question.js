import Vue from 'vue';

export const getQuestions = () => Vue.axios.get(`/questions`);
export const addQestion = question => Vue.axios.post('/questions', question);
