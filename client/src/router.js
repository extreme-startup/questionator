import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Training from './views/Training.vue';
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
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
        store.commit('setUser', response.data.email);
        next();
      })
      .catch(error => {
        next({
          path: '/login',
          query: { returnUrl: to.path },
        });
      });
  }
  next();
});

export default router;
