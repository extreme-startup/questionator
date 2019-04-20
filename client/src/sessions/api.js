import Vue from 'vue';

// session api
export const getSession = query => Vue.axios.get('/manage-session', { params: query });
export const addSession = session => Vue.axios.post('/manage-session', session);

// active session api
export const getActiveSession = sessionId => Vue.axios.get(`/manage-session/${sessionId}`);
// TODO: add implementation for this at the backend or change the route to the one
// that is going to be implemented for the session implementation
export const updateSession = session => Vue.axios.put(`/manage-session/${session.id}`, session);
