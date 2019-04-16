<template>
  <v-dialog v-model="isOpen" max-width="350">
    <v-card>
      <v-card-title v-if="title" class="headline">{{ title }}</v-card-title>
      <v-card-text v-if="text">{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="disagree">
          {{ disagreeName }}
        </v-btn>

        <v-btn color="green darken-1" flat="flat" @click="agree">
          {{ agreeName }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'config-dialog',
  props: {
    isOpen: Boolean,
    title: String,
    text: String,
    agree: Function,
    agreeName: {
      type: String,
      default: 'Ok',
    },
    disagree: Function,
    disagreeName: {
      type: String,
      default: 'Cancel',
    },
  },
};
</script>
