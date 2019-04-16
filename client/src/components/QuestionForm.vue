<template>
  <FormWrapper>
    <form @submit.prevent="submitQuestion" novalidate>
      <InputSwitcherWrapper v-if="isEditable('type')">
        <StyledSwitcherButton @click="toggleSwitcher($event, 'static')" :active="isStaticActive">
          Static
        </StyledSwitcherButton>
        <StyledSwitcherButton @click="toggleSwitcher($event, 'dynamic')" :active="isDynamicActive">
          Dynamic
        </StyledSwitcherButton>
      </InputSwitcherWrapper>
      <StaticText v-if="!isEditable('type')">Type: {{ question.type }}</StaticText>
      <InputWrapper>
        <input
          :class="['formInput', { formInputError: !isFormInputValid(errors.text) }]"
          v-if="isEditable('text')"
          v-model.trim="question.text"
          name="questionText"
          type="text"
          id="question-text-input"
          placeholder="Type your question"
          required
        />
        <StaticText v-if="!isEditable('text')">Question: {{ question.text }}</StaticText>
        <ErrorMsg id="question-text-error" v-if="!isFormInputValid(errors.text)">
          {{ getErrorMessage(errors.text) }}
        </ErrorMsg>
      </InputWrapper>
      <InputWrapper>
        <textarea
          :class="['formTextArea', { formTextAreaError: !isFormInputValid(errors.answer) }]"
          v-if="isEditable('answer')"
          v-model.trim="question.answer"
          name="answer"
          id="question-answer-input"
          placeholder="Type your answer"
          required
        ></textarea>
        <StaticText v-if="!isEditable('answer')">Answer: {{ question.answer }}</StaticText>
        <ErrorMsg id="question-answer-error" v-if="!isFormInputValid(errors.answer)">
          {{ getErrorMessage(errors.answer) }}
        </ErrorMsg>
      </InputWrapper>
      <InputWrapper>
        <input
          :class="['formInput', { formInputError: !isFormInputValid(errors.value) }]"
          v-if="isEditable('value')"
          v-model.trim="question.value"
          name="questionValue"
          type="text"
          id="question-value-input"
          placeholder="Enter question value (points)"
          required
        />
        <ErrorMsg id="question-value-error" v-if="!isFormInputValid(errors.value)">
          {{ getErrorMessage(errors.value) }}
        </ErrorMsg>
        <StaticText v-if="!isEditable('value')">Value: {{ question.value }}</StaticText>
      </InputWrapper>
      <ControlGroup>
        <StyledButton secondary type="reset" id="question-cancel-button" @click="close">
          Cancel
        </StyledButton>
        <StyledButton type="submit" id="question-save-button">{{ submitTitle }}</StyledButton>
      </ControlGroup>
    </form>
  </FormWrapper>
</template>

<style scoped>
.formTextArea {
  width: 100%;
  height: 80px;
  margin-bottom: 5px;
  border: none;
  font-size: 16px;
  text-indent: 15px;
  color: var(--text-color);
  outline: none;
  resize: none;
}

.formInput {
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: none;
  font-size: 16px;
  text-indent: 15px;
  color: var(--text-color);
  outline: none;
}

.formTextArea::placeholder,
.formInput::placeholder {
  color: var(--placeholder-color);
}

.formTextAreaError,
.formInputError {
  border: 1px solid red;
}
</style>

<script>
import styled from 'vue-styled-components';
import { Button } from '@/common/styledComponents';

const FormWrapper = styled.div`
  width: 570px;
  padding: 0 60px 30px;
  background-color: var(--bg-color);
  color: var(--text-color);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const InputSwitcherWrapper = styled(InputWrapper)`
  flex-direction: row;
`;

const SwitcherButtonProps = { active: Boolean };
const StyledSwitcherButton = styled('button', SwitcherButtonProps)`
  height: 36px;
  width: 100%;
  border: 1px solid #b3b3b3;
  background-color: ${props => (props.active ? '#B3B3B3' : '#ffffff')};
  color: ${props => (props.active ? '#ffffff' : '#B3B3B3')};
  cursor: pointer;
  outline: none;

  &:first-child {
    margin-right: 5px;
  }

  &:last-child {
    margin-left: 5px;
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

const StyledButton = styled(Button)`
  width: 100px;
  height: 30px;
  line-height: 30px;
  padding: 0;
  outline: none;
  cursor: pointer;

  &:first-child {
    margin-right: 25px;
  }
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
    StyledSwitcherButton,
    StaticText,
    ControlGroup,
    StyledButton,
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
    toggleSwitcher(event, type) {
      event.preventDefault();
      this.question.type = type;
    },
    isEditable(field) {
      return !this.editFieldsConfig || this.editFieldsConfig.includes(field);
    },
  },
};
</script>
