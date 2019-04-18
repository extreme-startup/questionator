<template>
  <Section>
    <LineChart :chart-data="answeredQuestions"></LineChart>
    <ul>
      <li
        v-for="userLegend in answeredQuestions.datasets"
        v-bind:key="userLegend.username"
        v-bind:style="{ color: userLegend.borderColor }">
        User:{{ userLegend.label }} Score: {{ userLegend.totalScore }}
      </li>
    </ul>
  </Section>
</template>
<script>
import LineChart from './LineChart';
import { Section } from '@/common/styledComponents';

export default {
  components: {
    LineChart,
    Section,
  },
  data() {
    return {
      polling: null,
    };
  },
  created() {
    this.polling = setInterval(() => {
      this.$store.dispatch('contest/getAnsweredQuestions');
    }, 1000);
  },
  computed: {
    answeredQuestions: function() {
      const datasets = this.$store.getters['contest/accumulatedAnsweredQuestions'];
      return {
        datasets,
      };
    },
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
};
</script>
