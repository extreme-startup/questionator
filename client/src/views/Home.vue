<template>
  <div>
    <Header />
    <Sessions />
    <Trainings />
  </div>
</template>

<script>
// @ is an alias to /src
import Trainings from '@/components/Trainings.vue';
import Sessions from '@/components/Sessions.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'home',
  components: {
    Header,
    Sessions,
    Trainings,
  },
};
</script>
