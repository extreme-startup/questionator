<template>
  <form v-on:submit.prevent.stop="submit">
    <v-container grid-list-md align-content-center>
      <v-layout>
        <v-flex xs6 class="ma-auto">
          <v-card class="pa-3 ma-auto">
            <v-text-field
              v-model="$v.userEmail.$model"
              v-bind:border="$v.userEmail.$error && '1px solid #f79483'"
              id="login"
              type="text"
              placeholder="Enter your email"
            />

            <div v-if="$v.userEmail.$error">
              <Paragraph v-if="!$v.userEmail.required" class="invalid" color="#f79483">
                Email required.
              </Paragraph>
              <Paragraph v-if="!$v.userEmail.email" class="invalid" color="#f79483">
                Valid email required.
              </Paragraph>
            </div>

            <v-btn color="info" id="submit" :disabled="$v.$invalid" type="submit">
              Login
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>

<script>
import { Paragraph } from '@/common/styledComponents';
import { login } from '@/api/auth';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'LoginForm',
  components: {
    Paragraph,
  },
  data() {
    return {
      userEmail: null,
      error: null,
    };
  },
  validations: {
    userEmail: {
      required,
      email,
    },
  },
  methods: {
    submit() {
      login(this.userEmail)
        .then(response => {
          this.$store.dispatch('setUser', response.data.email);
          this.$router.push(this.$route.query.returnUrl || '/');
        })
        .catch(error => {
          this.error = error.response.data.message;
        });
    },
  },
};
</script>
