<template>
  <div>
    <Header />
    <ActiveSession />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ActiveSession from '@/contest-session/ActiveSession';

export default {
  name: 'training-session',
  components: {
    Header,
    ActiveSession,
  },
};
</script>
