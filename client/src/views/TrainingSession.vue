<template>
  <div>
    <Header/>
    <ActiveSession :sessionId="id"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ActiveSession from '@/sessions/ActiveSession';

export default {
  props: {
    id: String,
  },
  name: 'training-session',
  components: {
    Header,
    ActiveSession,
  },
};
</script>
