<template>
  <div>
    <Header />
    <Section>
      <TitleH1>Training #{{ $route.params.id }}</TitleH1>
      <TabbedPanel :tabs="tabs" />
    </Section>
  </div>
</template>

<script>
import TabbedPanel from '@/components/TabbedPanel.vue';
import Header from '@/components/Header.vue';
import { TitleH1, Section } from '@/common/styledComponents';

export default {
  name: 'training',
  components: {
    TabbedPanel,
    Header,
    TitleH1,
    Section,
  },
  data: function() {
    return {
      tabs: ['Questions', 'Sessions'],
    };
  },
};
</script>
