<template>
  <v-dialog @keydown.esc="cancel" v-model="dialog" max-width="290">
    <v-layout row justify-center>
      <v-card>
        <v-card-title class="headline">You've been successfully registered!</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="agree">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-dialog>
</template>

<script>
export default {
  name: 'CompetitionRegistrationModal',
  data: component => {
    return {
      dialog: false,
      resolve: null,
      reject: null,
    };
  },
  watch: {
    dialog: function(val) {
      if (!val) {
        this.$emit('close', false);
      }
    },
  },
  methods: {
    open() {
      this.dialog = true;

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>
