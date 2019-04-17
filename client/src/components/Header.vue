<template>
  <v-toolbar color="cyan">
    <v-toolbar-title>
      <h1><a href="/" class="white--text">Questionator</a></h1>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-layout>
        <v-flex>
          <v-text-field dark color="white" placeholder="Search" />
        </v-flex>

        <v-flex align-self-center>
          <v-chip
            ><a class="subheading" id="profile" href="/">{{ $store.state.user.email }}</a></v-chip
          >
        </v-flex>
      </v-layout>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  components: {},
};
</script>
