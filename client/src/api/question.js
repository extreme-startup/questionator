import Vue from 'vue';

export const getQuestions = contestId => Vue.axios.get(`/contest/${contestId}/questions`);
export const addQuestion = question => Vue.axios.post('/questions', question);
export const askQuestion = () => Vue.axios.get(`/questions/ea6bb938-a774-48a2-b7c0-dea028c8da0d/ask`);
export const updateQuestion = question => Vue.axios.put(`/questions/${question.id}`, question);
export const deleteQuestion = question =>
  Vue.axios.put(`/questions/${question.id}`, { ...question, isDeleted: true });
