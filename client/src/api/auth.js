import Vue from 'vue';

export function login(email) {
  return Vue.axios.post('/auth/login', { email });
}

export function logout() {
  return Vue.axios.get('/auth/logout');
}

export function getUserAuthenticated() {
  return Vue.axios.get('/auth/getUserAuthenticated');
}

export function getUser(userId) {
  return Vue.axios.get(`/users/${userId}`);
}
