import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Training from './views/Training.vue';
import TrainingSession from './views/TrainingSession.vue';
import Participate from './views/Participate.vue';
import store from './store';
import { getUserAuthenticated, getUser } from './api/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/training/:id',
      name: 'training',
      component: Training,
      props: true,
    },
    {
      path: '/training-session/:id',
      name: 'training-session',
      component: TrainingSession,
      props: true,
    },
    {
      path: '/participate/:sessionId',
      name: 'participate',
      component: Participate,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !store.state.isUserLoggedIn) {
    getUserAuthenticated()
      .then(response => getUser(response.data.user))
      .then(response => {
        store.commit('setUser', response.data);
        next();
      })
      .catch(error => {
        next({
          path: '/login',
          query: { returnUrl: to.path },
        });
      });
  } else {
    next();
  }
});

export default router;
