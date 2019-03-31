<template>
  <FormWrapper>
    <form @submit.prevent="submitQuestion" novalidate>
      <InputWrapper>
        <Select
          v-model="question.type"
          :options="typeOptions"
          :placeholder="placeholder"
          :error="errors.type.required"
        />
        <ErrorMsg v-if="errors.type.required">This field is required</ErrorMsg>
      </InputWrapper>
      <InputWrapper>
        <StyledTextInput
          v-model="question.text"
          name="questionText"
          type="text"
          placeholder="Type your question"
          :error="errors.text.required"
          required
        />
        <ErrorMsg v-if="errors.text.required">This field is required</ErrorMsg>
      </InputWrapper>
      <InputWrapper>
        <StyledTextArea
          v-model="question.answer"
          name="answer"
          placeholder="Type your answer"
          :error="errors.answer.required"
          required
        />
        <ErrorMsg v-if="errors.answer.required">This text is required</ErrorMsg>
      </InputWrapper>
      <StyledTextInput v-model="question.value" name="questionValue" type="text" />
      <ControlGroup>
        <StyledButton secondary type="reset" @click="close">Cancel</StyledButton>
        <StyledButton type="submit">Save</StyledButton>
      </ControlGroup>
    </form>
  </FormWrapper>
</template>

<script>
import styled from 'vue-styled-components';
import Select from '@/common/Select';
import { Button } from '@/common/styledComponents';

const FormWrapper = styled.div`
  width: 570px;
  padding: 0 60px 30px;
  background-color: var(--bg-color);
  color: var(--text-color);
`;

const InputWrapper = styled.div`
  margin-bottom: 25px;
`;

const InputProps = { error: Boolean };
export const StyledTextInput = styled('input', InputProps)`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: none;
  font-size: 16px;
  border: ${props => (props.error ? '1px solid red' : 'none')};
  color: var(--text-color);
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }
`;

export const StyledTextArea = styled('textarea', InputProps)`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: none;
  font-size: 16px;
  border: ${props => (props.error ? '1px solid red' : 'none')};
  color: var(--text-color);
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }
`;

const ControlGroup = styled.div`
  padding-top: 25px;
  text-align: right;
`;

const StyledButton = styled(Button)`
  width: 100px;
  height: 30px;
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
  data: function() {
    return {
      question: this.value,
    };
  },
  props: ['value', 'errors', 'typeOptions', 'placeholder'],
  components: {
    FormWrapper,
    InputWrapper,
    StyledTextInput,
    StyledTextArea,
    ControlGroup,
    StyledButton,
    Select,
    ErrorMsg,
  },
  methods: {
    submitQuestion(event) {
      const qs = { ...this.question };
      if (!this.formValidate(qs)) {
        return;
      }
      this.$emit('submit', qs);
      event.target.reset();
      this.$nextTick(() => (this.question = { ...this.value }));
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
      this.question = { ...this.value };
    },
  },
};
</script>
