<template>
  <Fragment>
    <Header />
    <Sessions />
    <Trainings />
  </Fragment>
</template>

<script>
// @ is an alias to /src
import Trainings from '@/components/Trainings.vue';
import Sessions from '@/components/Sessions.vue';
import Header from '@/components/Header.vue';
import { Fragment } from 'vue-fragment';

export default {
  name: 'home',
  components: {
    Header,
    Sessions,
    Trainings,
    Fragment,
  },
};
</script>
