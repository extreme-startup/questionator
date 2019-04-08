<template>
  <form v-on:submit.prevent.stop="submit">
    <Section>
      <Section>
        <Input
          v-model="$v.userEmail.$model"
          v-bind:border="$v.userEmail.$error && '1px solid #f79483'"
          id="login"
          type="text"
          placeholder="Enter your email"
        />
      </Section>
      <Section v-if="$v.userEmail.$error">
        <Paragraph v-if="!$v.userEmail.required" class="invalid" color="#f79483">
          Email required.
        </Paragraph>
        <Paragraph v-if="!$v.userEmail.email" class="invalid" color="#f79483">
          Valid email required.
        </Paragraph>
      </Section>
      <Section>
        <Button id="submit" :disabled="$v.$invalid" type="submit">Login</Button>
      </Section>
    </Section>
  </form>
</template>

<script>
import { Button, Input, Paragraph, Section } from '@/common/styledComponents';
import { login } from '@/api/auth';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'LoginForm',
  components: {
    Section,
    Paragraph,
    Button,
    Input,
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
