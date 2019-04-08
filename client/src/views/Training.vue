<template>
  <Fragment>
    <Header />
    <Section>
      <TitleH1>Training #{{ $route.params.id }}</TitleH1>
      <TabbedPanel :tabs="tabs" />
    </Section>
  </Fragment>
</template>

<script>
import TabbedPanel from '@/components/TabbedPanel.vue';
import Header from '@/components/Header.vue';
import { TitleH1, Section } from '@/common/styledComponents';
import { Fragment } from 'vue-fragment';

export default {
  name: 'training',
  components: {
    TabbedPanel,
    Header,
    Fragment,
    TitleH1,
    Section,
  },
  data: function() {
    return {
      tabs: ['Questions', 'Builder', 'Sessions'],
    };
  },
};
</script>
