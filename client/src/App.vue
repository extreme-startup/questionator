<template>
  <div id="app">
    <div class="serverMsg successMsg" v-if="httpGetResponce">
      Server responded with following message:
      <strong>{{ httpGetResponce.data }}</strong>
    </div>
    <div class="serverMsg errorMsg" v-if="httpGetError">
      The error message is following:
      <strong>{{ httpGetError.message }}</strong>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      httpGetResponce: null,
      httpGetError: null,
    };
  },
  mounted: async function() {
    try {
      this.httpGetResponce = await this.$http.get('/hello');
    } catch (err) {
      this.httpGetError = err;
    }
  },
};
</script>

<style lang="scss">
@import '~reset-css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.serverMsg {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 2em;
  border: 2px solid;
  text-align: center;
}
.successMsg {
  border-color: #096427;
  background-color: #0cdf64;
  &strong {
    color: #154cc2;
  }
}
.errorMsg {
  border-color: #830909;
  background-color: #f15151;
  &strong {
    color: #530947;
  }
}
</style>
