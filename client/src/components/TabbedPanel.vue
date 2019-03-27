<template>
  <Fragment>
    <TabList>
      <Tab
        v-for="tab in tabs"
        :key="tab"
        :class="[{ active: activeTab === tab }]"
        @click="swithTab(tab)"
      >
        {{ tab }}
      </Tab>
    </TabList>
    <component :is="currentTabComponent"></component>
  </Fragment>
</template>

<script>
import styled from 'vue-styled-components';
import { Fragment } from 'vue-fragment';
import QuestionTab from './QuestionTab.vue';

const TabList = styled.ul`
  margin-top: 50px;
  margin-bottom: 15px;
  display: flex;
  font-size: 1.2rem;
`;

const Tab = styled.li`
  padding: 8px 0;
  margin-right: 40px;
  cursor: pointer;

  &.active {
    font-weight: 600;
    border-bottom: solid 1px grey;
  }
`;

export default {
  name: 'TabbedPanel',
  data() {
    return { activeTab: null };
  },
  props: {
    tabs: Array,
  },
  components: {
    TabList,
    Tab,
    Fragment,
    questions: QuestionTab,
  },
  methods: {
    swithTab(tab) {
      this.activeTab = tab;
    },
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
