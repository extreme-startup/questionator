<template>
  <FormWrapper>
    <form @submit.prevent="submitQuestion" novalidate>
      <InputSwitcherWrapper v-if="isEditable('type')">
        <StyledSwitcherButton @click="toggleSwitcher($event, 'static')" :active="isStaticActive"
          >Static</StyledSwitcherButton
        >
        <StyledSwitcherButton @click="toggleSwitcher($event, 'dynamic')" :active="isDynamicActive"
          >Dynamic</StyledSwitcherButton
        >
      </InputSwitcherWrapper>
      <StaticText v-if="!isEditable('type')">Type: {{ question.type }}</StaticText>
      <InputWrapper>
        <StyledTextInput
          v-if="isEditable('text')"
          v-model="question.text"
          name="questionText"
          type="text"
          id="question-text-input"
          placeholder="Type your question"
          :error="errors.text.required"
          required
        />
        <StaticText v-if="!isEditable('text')">Question: {{ question.text }}</StaticText>
        <ErrorMsg v-if="errors.text.required">This field is required</ErrorMsg>
      </InputWrapper>
      <InputWrapper>
        <textarea
          :class="['formTextArea', { formTextAreaError: errors.answer.required }]"
          v-if="isEditable('answer')"
          v-model="question.answer"
          name="answer"
          id="question-answer-input"
          placeholder="Type your answer"
          :error="errors.answer.required"
          required
        ></textarea>
        <StaticText v-if="!isEditable('answer')">Answer: {{ question.answer }}</StaticText>
        <ErrorMsg v-if="errors.answer.required">This field is required</ErrorMsg>
      </InputWrapper>
      <InputWrapper>
        <StyledTextInput
          v-if="isEditable('value')"
          v-model="question.value"
          name="questionValue"
          type="text"
          id="question-value-input"
          placeholder="Enter question value (points)"
        />
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

.formTextArea::placeholder {
  color: var(--placeholder-color);
}

.formTextAreaError {
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

const InputProps = { error: Boolean };
export const StyledTextInput = styled('input', InputProps)`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: none;
  font-size: 16px;
  text-indent: 15px;
  border: ${props => (props.error ? '1px solid red' : 'none')};
  color: var(--text-color);
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
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

export default {
  name: 'QuestionForm',
  props: ['question', 'errors', 'submitTitle', 'editFieldsConfig'],
  components: {
    FormWrapper,
    InputWrapper,
    InputSwitcherWrapper,
    StyledSwitcherButton,
    StyledTextInput,
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
      this.$emit('submit', qs);
      event.target.reset();
    },
    formValidate(question) {
      const isFormValid = Object.keys(question).reduce((acc, key) => {
        if (!this.errors[key]) return acc;
        this.errors[key].required = question[key] === '';
        return acc && !this.errors[key].required;
      }, true);

      return isFormValid;
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
