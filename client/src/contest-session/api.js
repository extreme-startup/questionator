import Vue from 'vue';

// session api
export const getSession = payload => Vue.axios.get('/contest-sessions', { params: payload });
export const addSession = session => Vue.axios.post('/contest-sessions', session);

// active session api
export const getActiveSession = sessionId => Vue.axios.get(`/contest-sessions/${sessionId}`);
export const getContestSessionResults = (contestSessionId, lastAnswerOn) =>
  Vue.axios.get(`/contest-sessions/result/${contestSessionId}?answerOn=${lastAnswerOn}`);
export const getLastAnswerOn = contestSessionId =>
  Vue.axios.get(`/contest-sessions/lastAnswerOn/${contestSessionId}`);
// TODO: add implementation for this at the backend or change the route to the one
// that is going to be implemented for the session implementation
export const startSession = session => Vue.axios.put(`/contest-sessions/start`, session);
export const pauseSession = session => Vue.axios.put(`/contest-sessions/pause`, session);
export const continueSession = session => Vue.axios.put(`/contest-sessions/continue`, session);
export const completeSession = session => Vue.axios.put(`/contest-sessions/complete`, session);
