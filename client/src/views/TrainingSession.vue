<template>
  <div>
    <Header />
    <SelectedContestSession />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import SelectedContestSession from '@/contest-session/SelectedContestSession';

export default {
  name: 'training-session',
  components: {
    Header,
    SelectedContestSession,
  },
};
</script>
