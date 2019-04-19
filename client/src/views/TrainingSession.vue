<template>
  <div>
    <Header />
    <ActiveSession />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ActiveSession from '@/sessions/ActiveSession';

export default {
  name: 'training-session',
  components: {
    Header,
    ActiveSession,
  },
};
</script>
