<template>
  <v-container>
    <form @submit.prevent="submitQuestion" novalidate>
      <v-layout v-if="isEditable('type')">
        <p class="caption grey--text lighten-2--text">Type</p>
        <v-radio-group v-model="question.type" :mandatory="true" row>
          <v-radio label="Static" value="static"></v-radio>
          <v-radio label="Dynamic" value="dynamic"></v-radio>
        </v-radio-group>
      </v-layout>
      <p class="pt-8" v-if="!isEditable('type')">Type: {{ question.type }}</p>
      <v-layout justify-space-between column mb-4>
        <v-text-field
          :error="!isFormInputValid(errors.text)"
          v-if="isEditable('text')"
          v-model.trim="question.text"
          name="questionText"
          id="question-text-input"
          label="Question*"
          placeholder="Type your question"
          required
        ></v-text-field>
        <p class="pt-8" v-if="!isEditable('text')">Question: {{ question.text }}</p>
        <p class="caption red--text" id="question-text-error" v-if="!isFormInputValid(errors.text)">
          {{ getErrorMessage(errors.text) }}
        </p>
      </v-layout>
      <v-layout justify-space-between column mb-4>
        <v-textarea
          :error="!isFormInputValid(errors.answer)"
          name="answer"
          label="Answer*"
          v-if="isEditable('answer')"
          v-model.trim="question.answer"
          id="question-answer-input"
          placeholder="Type your answer"
          no-resize
          required
        ></v-textarea>
        <p class="pt-8" v-if="!isEditable('answer')">Answer: {{ question.answer }}</p>
        <p
          class="caption red--text"
          id="question-answer-error"
          v-if="!isFormInputValid(errors.answer)"
        >
          {{ getErrorMessage(errors.answer) }}
        </p>
      </v-layout>
      <v-layout justify-space-between column mb-4>
        <v-text-field
          :error="!isFormInputValid(errors.value)"
          v-if="isEditable('value')"
          v-model.trim="question.value"
          label="Points*"
          name="questionValue"
          id="question-value-input"
          placeholder="Enter question value (points)"
          required
        ></v-text-field>
        <p
          class="caption red--text"
          id="question-value-error"
          v-if="!isFormInputValid(errors.value)"
        >
          {{ getErrorMessage(errors.value) }}
        </p>
        <p class="pt-8" v-if="!isEditable('value')">Value: {{ question.value }}</p>
      </v-layout>
      <small class="grey--text lighten-2--text">*indicates required field</small>
      <div class="pt-4 right">
        <v-btn color="blue darken-1" flat type="reset" id="question-cancel-button" @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" flat type="submit" id="question-save-button">
          {{ submitTitle }}
        </v-btn>
      </div>
    </form>
  </v-container>
</template>

<script>
const isNumber = n => /^\d+$/.test(n);

export default {
  name: 'QuestionForm',
  props: ['question', 'errors', 'submitTitle', 'editFieldsConfig'],
  computed: {
    isStaticActive: function() {
      return this.question.type === 'static';
    },
    isDynamicActive: function() {
      return this.question.type === 'dynamic';
    },
  },
  methods: {
    submitQuestion(event) {
      const qs = { ...this.question };
      if (!this.formValidate(qs)) {
        return;
      }
      const question = { ...qs, value: Number(qs.value) };
      this.$emit('submit', question);
      event.target.reset();
    },
    formValidate(question) {
      const isFormValid = Object.keys(question).reduce((acc, key) => {
        if (!this.errors[key]) return acc;

        Object.keys(this.errors[key]).forEach(errorKey => {
          let error = this.errors[key][errorKey];
          if (errorKey === 'required') {
            error = question[key] === '';
          }

          if (errorKey === 'isNumber') {
            error = !isNumber(question[key]);
          }
          this.errors[key][errorKey] = error;
        });

        return acc && !this.errors[key].required && !this.errors[key].isNumber;
      }, true);

      return isFormValid;
    },
    isFormInputValid(errors) {
      return Object.keys(errors).reduce((acc, errKey) => acc && !errors[errKey], true);
    },
    getErrorMessage(errors) {
      if (errors.required) return 'This field is required';
      if (errors.isNumber) return 'This field is not a valid number';
      return '';
    },
    close() {
      this.$emit('close');
    },
    isEditable(field) {
      return !this.editFieldsConfig || this.editFieldsConfig.includes(field);
    },
  },
};
</script>
