import Vue from 'vue';

// session api
export const getSession = () => Vue.axios.get('/manage-session');
export const addSession = session => Vue.axios.post('/manage-session', session);

// TODO: add implementation for this at the backend or change the route to the one
// that is going to be implemented for the session implementation
export const startSession = sessionId => Vue.axios.post(`/manage-session/start?${sessionId}`);
