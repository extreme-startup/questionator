<template>
  <div>
    <Header />
    <Section>
      <h2>Session #{{ $route.params.id }}</h2>
      <LeaderBoard />
    </Section>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LeaderBoard from '@/components/LeaderBoard.vue';

import { Section } from '@/common/styledComponents';

export default {
  name: 'training-session',
  components: {
    Header,
    LeaderBoard,
    Section,
  },
};
</script>
