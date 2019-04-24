<template>
  <v-dialog v-model="isOpen" persistent :max-width="maxWidth">
    <v-card>
      <v-container>
        <v-card-title v-if="title" class="headline">{{ title }}</v-card-title>
        <v-card-text v-if="text">{{ text }}</v-card-text>
        <slot></slot>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="hideControls === false" color="green darken-1" flat="flat" @click="disagree">
            {{ disagreeName }}
          </v-btn>

          <v-btn v-if="hideControls === false" color="green darken-1" flat="flat" @click="agree">
            {{ agreeName }}
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'config-dialog',
  props: {
    isOpen: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 390,
    },
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
    hideControls: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
