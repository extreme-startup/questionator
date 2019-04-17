<template>
  <div class="small" style="position: relative; height:80vh; width:100vw">
    <CommitChart :chart-data="answeredQuestions"></CommitChart>
    <ul>
      <li v-for="userLegend in legend" v-bind:key="userLegend.username">
        <span>{{ userLegend.username }}</span>
        {{ userLegend.score }}
      </li>
    </ul>
  </div>
</template>
<script>
import CommitChart from './CommitChart';

export default {
  components: {
    CommitChart,
  },
  data() {
    return {
      legend: [],
      chartData: null,
      datacollection: null,
    };
  },
  mounted() {
    setInterval(() => {
      this.$store.dispatch('contest/getAnsweredQuestions');
    }, 500);
  },
  computed: {
    answeredQuestions: function() {
      const datasets = this.$store.getters['contest/accumulatedAnsweredQuestions'];
      return {
        datasets,
      };
    },
  },
  sockets: {
    connect: function() {
      // eslint-disable-next-line no-console
      console.log('socket connected');
    },
    customEmit: function(data) {
      // eslint-disable-next-line no-console
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
    },
    events: function(data) {
      // eslint-disable-next-line no-console
      console.log(data);
    },
  },
  methods: {
    sendMessage(e) {
      this.$socket.emit('events', [1, 2, 3]);
    },
  },
};
</script>
