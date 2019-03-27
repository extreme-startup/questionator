<template>
  <TabbedPanel :tabs="tabs" :active-tab="'questions'" />
</template>

<script>
import TabbedPanel from '@/components/TabbedPanel.vue';

export default {
  name: 'training',
  components: {
    TabbedPanel,
  },
  data: function() {
    return {
      tabs: ['Questions', 'Something'],
    };
  },
};
</script>
