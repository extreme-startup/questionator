<template>
  <v-app>
    <Header />
    <v-card color="grey lighten-4" height="100%" flat>
      <v-toolbar color="cyan" dark tabs>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Training #{{ $route.params.id }}</v-toolbar-title>
      </v-toolbar>
      <TabbedPanel :tabs="tabs" />
    </v-card>
  </v-app>
</template>

<script>
import TabbedPanel from '@/components/TabbedPanel.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'training',
  components: {
    TabbedPanel,
    Header,
  },
  data: function() {
    return {
      tabs: ['Questions', 'Sessions'],
    };
  },
};
</script>
