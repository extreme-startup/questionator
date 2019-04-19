<template>
  <FormWrapper>
    <form @submit.prevent="submitQuestion" novalidate>
      <InputSwitcherWrapper v-if="isEditable('type')">
        <p>Type</p>
        <v-radio-group v-model="question.type" :mandatory="true" row>
          <v-radio label="Static" value="static"></v-radio>
          <v-radio label="Dynamic" value="dynamic"></v-radio>
        </v-radio-group>
      </InputSwitcherWrapper>
      <StaticText v-if="!isEditable('type')">Type: {{ question.type }}</StaticText>
      <InputWrapper>
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
        <StaticText v-if="!isEditable('text')">Question: {{ question.text }}</StaticText>
        <ErrorMsg id="question-text-error" v-if="!isFormInputValid(errors.text)">
          {{ getErrorMessage(errors.text) }}
        </ErrorMsg>
      </InputWrapper>
      <InputWrapper>
        <v-textarea
          :error="!isFormInputValid(errors.answer)"
          name="answer"
          label="Answer*"
          v-if="isEditable('answer')"
          v-model.trim="question.answer"
          id="question-answer-input"
          placeholder="Type your answer"
          no-resize="false"
          required
        ></v-textarea>
        <StaticText v-if="!isEditable('answer')">Answer: {{ question.answer }}</StaticText>
        <ErrorMsg id="question-answer-error" v-if="!isFormInputValid(errors.answer)">
          {{ getErrorMessage(errors.answer) }}
        </ErrorMsg>
      </InputWrapper>
      <InputWrapper>
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
        <ErrorMsg id="question-value-error" v-if="!isFormInputValid(errors.value)">
          {{ getErrorMessage(errors.value) }}
        </ErrorMsg>
        <StaticText v-if="!isEditable('value')">Value: {{ question.value }}</StaticText>
      </InputWrapper>
      <ControlGroup>
        <v-btn color="blue darken-1" flat type="reset" id="question-cancel-button" @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" flat type="submit" id="question-save-button">
          {{ submitTitle }}
        </v-btn>
      </ControlGroup>
    </form>
  </FormWrapper>
</template>

<script>
import styled from 'vue-styled-components';

const FormWrapper = styled.div`
  width: 570px;
  padding: 0 60px 30px;
  background-color: var(--btn-color);
  color: var(--text-color);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const InputSwitcherWrapper = styled(InputWrapper)`
  p {
    margin: 0;
    font-size: 12px;
    color: var(--btn-bg-secondary);
  }
`;

const StaticText = styled.p`
  padding: 8px 0;
  margin: 0;
`;

const ControlGroup = styled.div`
  padding-top: 25px;
  text-align: right;
`;

const ErrorMsg = styled.span`
  font-size: 10px;
  color: red;
`;

const isNumber = n => /^\d+$/.test(n);

export default {
  name: 'QuestionForm',
  props: ['question', 'errors', 'submitTitle', 'editFieldsConfig'],
  components: {
    FormWrapper,
    InputWrapper,
    InputSwitcherWrapper,
    StaticText,
    ControlGroup,
    ErrorMsg,
  },
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
