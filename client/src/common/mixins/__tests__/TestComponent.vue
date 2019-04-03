<template>
  <div>
    <div id="testMsg" v-if="isShown">Test</div>
    <button id="testShowBtn" @click="show">Show</button>
    <button id="testToggleBtn" @click="toggle">Toggle</button>
    <button id="testCloseBtn" @click="close">Close</button>
  </div>
</template>

<script>
export default {
  name: 'testComponent',
};
</script>
