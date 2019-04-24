<template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-flex xs12 md6>
        <h2 class="m-bottom-4">Participant Registration</h2>
        <v-form v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="nickname"
            :rules="nicknameRules"
            :counter="15"
            label="Nickname"
            required
          ></v-text-field>
          <v-btn color="success" type="submit" :disabled="!valid">Register</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getIsRequiredValidator, getLengthValidator } from '../utils/input-validators.js';
import { registerInCompetition } from '../api/competition';

export default {
  name: 'LoginForm',
  data: () => ({
    valid: false,
    nickname: '',
    nicknameRules: [
      getIsRequiredValidator({ inputName: 'Nickname' }),
      getLengthValidator({ inputName: 'Nickname', length: 15 }),
    ],
  }),
  computed: {
    user: function() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    submit: function() {
      registerInCompetition({
        playerId: this.user,
        sessionId: this.$route.params.sessionId,
        playerName: this.nickname,
      });
    },
  },
};
</script>
