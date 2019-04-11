<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import '~normalize.css';

/*
vars
*/
div {
  --text-color: #222222;
  --btn-bg: #4f4f4f;
  --btn-color: #fff;
  --btn-bg-primary: #eeeb49;
  --btn-color-primary: #222222;
  --btn-bg-secondary: #9c9c9c;
  --btn-color-secondary: #fff;
  --bg-color: #f1f1f1;
  --placeholder-color: #bbbbbb;
  --bg: #efefef;
}
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
