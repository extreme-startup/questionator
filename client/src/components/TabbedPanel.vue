<template>
  <div>
    <ul>
      <li v-for="tab in tabs" :key="tab" :class="['tab-toggle', { active: activeTab === tab }]">
        <styled-title>{{ tab }}</styled-title>
      </li>
    </ul>
    <component :is="currentTabComponent"></component>
  </div>
</template>

<script>
import { Title } from '@/common/styledComponents';
import QuestionTab from './QuestionTab.vue';

export default {
  name: 'TabbedPanel',
  props: {
    tabs: Array,
    activeTab: String,
  },
  components: {
    'styled-title': Title,
    questions: QuestionTab,
  },
  computed: {
    currentTabComponent: function() {
      return this.activeTab.toLowerCase();
    },
  },
};
</script>
