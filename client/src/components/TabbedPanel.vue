<template>
  <div>
    <v-tabs v-model="activeTab" color="cyan" dark fixed-tabs slider-color="white">
      <v-tab v-for="tab in tabs" :key="tab" :href="'#' + tab" ripple>
        {{ tab }}
      </v-tab>
    </v-tabs>
    <component :is="currentTabComponent"></component>
  </div>
</template>

<script>
import QuestionTab from './QuestionTab.vue';
import ManageSession from '@/sessions/ManageSession.vue';

export default {
  name: 'TabbedPanel',
  data() {
    return { activeTab: null };
  },
  props: {
    tabs: Array,
  },
  components: {
    questions: QuestionTab,
    sessions: ManageSession,
  },
  computed: {
    currentTabComponent: function() {
      return this.activeTab && this.activeTab.toLowerCase();
    },
  },
  mounted() {
    this.activeTab = this.tabs && this.tabs[0];
  },
};
</script>
