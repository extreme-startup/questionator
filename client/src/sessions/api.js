import Vue from 'vue';

export const getSession = () => Vue.axios.get('/manage-session');
export const addSession = session => Vue.axios.post('/manage-session', session);
