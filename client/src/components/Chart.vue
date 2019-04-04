<template>
  <div class="card mt-3">
    <div>
      <CommitChart></CommitChart>
    </div>

    <button class="btn btn-success" v-on:click="sendMessage()">Send</button>
  </div>
</template>
<script>
import CommitChart from './CommitChart';

export default {
  components: {
    CommitChart,
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
