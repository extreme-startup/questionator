<template>
  <LineChart :chart-data="answeredQuestions"></LineChart>
</template>
<script>
import LineChart from './LineChart';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      polling: null,
    };
  },
  props: {
    contestSessionId: String,
  },
  created() {
    this.polling = setInterval(() => {
      this.$store.dispatch('contest/getAnsweredQuestions', this.contestSessionId);
    }, 2000);
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
