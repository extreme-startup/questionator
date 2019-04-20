<template>
  <v-layout row>
    <v-flex md8>
      <LineChart :chart-data="answeredQuestions"></LineChart>
    </v-flex>
    <v-flex md4>
      <v-layout row wrap>
        <v-flex
          xs5
          v-for="userLegend in answeredQuestions.datasets"
          v-bind:key="userLegend.username"
          v-bind:style="{ color: userLegend.borderColor }"
        >
          User:{{ userLegend.label }} Score: {{ userLegend.totalScore }}
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
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
