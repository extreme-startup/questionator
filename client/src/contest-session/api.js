import Vue from 'vue';

// session api
export const getSession = () => Vue.axios.get('/contest-sessions');
export const addSession = session => Vue.axios.post('/contest-sessions', session);

// TODO: add implementation for this at the backend or change the route to the one
// that is going to be implemented for the session implementation
export const startSession = sessionId => Vue.axios.post(`/manage-session/start?${sessionId}`);
