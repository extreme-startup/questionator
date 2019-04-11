import Vue from 'vue';

export const getQuestions = contestId => Vue.axios.get(`/contest/${contestId}/questions`);
export const addQuestion = question => Vue.axios.post('/questions', question);
export const updateQuestion = question => Vue.axios.put(`/questions/${question.id}`, question);
export const deleteQuestion = question =>
  Vue.axios.put(`/questions/${question.id}`, { ...question, isDeleted: true });
