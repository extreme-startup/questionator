<template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-flex xs12 md6>
        <h2 class="m-bottom-4">Participant Registration</h2>
        <v-form v-model="valid">
          <v-text-field
            v-model="nickname"
            :rules="nicknameRules"
            :counter="15"
            label="Nickname"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-btn color="success">Register</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LoginForm',
  data: () => ({
    valid: false,
    nickname: '',
    nicknameRules: [
      v => !!v || 'Nickname is required',
      v => v.length <= 10 || 'Nickname must be less than 15 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
};
</script>
