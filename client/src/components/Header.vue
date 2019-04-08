<template>
  <v-toolbar color="cyan">
    <v-toolbar-title>
      <a href="/" class="white--text">Questionator</a>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toollbar-items>
      <v-container column>
        <v-layout>
          <v-flex>
            <v-text-field dark color="white" placeholder="Search" />
          </v-flex>

          <v-flex align-self-center>
            <v-chip
              ><a class="subheading" id="profile" href="/">{{ $store.state.user }}</a></v-chip
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-toollbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  components: {},
};
</script>
