import Vue from 'vue';

// session api
export const getSession = (payload) => Vue.axios.get('/contest-sessions', { params: payload });
export const addSession = session => Vue.axios.post('/contest-sessions', session);

// active session api
export const getActiveSession = sessionId => Vue.axios.get(`/contest-sessions/${sessionId}`);
// TODO: add implementation for this at the backend or change the route to the one
// that is going to be implemented for the session implementation
export const updateSession = session => Vue.axios.put(`/contest-sessions/${session.id}`, session);
