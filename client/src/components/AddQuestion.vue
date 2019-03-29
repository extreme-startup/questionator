<template>
  <div>
    <slot :clickHandler="show"></slot>
    <Modal v-show="isShown" @close="close">
      <template v-slot:header>
        <Title>Add new question</Title>
      </template>
      <QuestionForm
        v-model="question"
        :typeOptions="typeOptions"
        :errors="errors"
        placeholder="Select question type"
        @submit="submitQuestion"
        @close="close"
      ></QuestionForm>
    </Modal>
  </div>
</template>

<script>
import styled from 'vue-styled-components';
import Modal from '@/common/Modal.vue';
import QuestionForm from '@/components/QuestionForm.vue';
import { TitleH3 } from '@/common/styledComponents';
import { toggle } from '@/common/mixins/toggle';

// TODO: remove mock data
const mockedOptions = [{ id: 1, value: 'Static' }, { id: 2, value: 'Dynamic' }];

const Title = styled(TitleH3)`
  width: 100%;
  padding: 30px 0 30px 60px;
  margin: 0;
  text-align: left;
  font-weight: normal;
  box-sizing: border-box;
  background-color: var(--bg-color);
`;

const defaults = {
  type: '',
  text: '',
  answer: '',
  value: '',
};

const errors = {
  type: {
    required: false,
  },
  text: {
    required: false,
  },
  answer: {
    required: false,
  },
};

export default {
  name: 'addQuestion',
  data: () => ({
    typeOptions: mockedOptions,
    question: { ...defaults },
    errors,
  }),
  components: {
    Modal,
    Title,
    QuestionForm,
  },
  mixins: [toggle],
  methods: {
    async submitQuestion(question) {
      this.question = { ...defaults };
      this.close();
      try {
        // TODO: check post req
        await this.$http.post('/question', question);
      } catch (err) {
        // TODO: log error
      }
    },
  },
};
</script>
