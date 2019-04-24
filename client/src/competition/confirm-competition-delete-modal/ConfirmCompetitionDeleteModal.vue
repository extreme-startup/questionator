<template>
  <v-dialog persistent @keydown.esc="cancel" v-model="dialog" max-width="290">
    <v-layout row justify-center>
        <v-card>
          <v-card-title class="headline">Delete</v-card-title>

          <v-card-text>
            Are you sure you want to delete training?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="cancel"
            >
              Cancel
            </v-btn>

            <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="agree"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-layout>
  </v-dialog>
</template>

<script>

export default {
  name: 'ConfirmCompetitionDeletionModal',
  data: component => {
    return {
      dialog: false,
      resolve: null,
      reject: null,
    };
  },
  methods: {
    async open() {
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
