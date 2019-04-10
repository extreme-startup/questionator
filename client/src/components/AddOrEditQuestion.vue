<template>
  <Modal @close="close">
    <template v-slot:header>
      <Title>{{ titles.title }}</Title>
    </template>
    <QuestionForm
      :question="question"
      :submitTitle="titles.submitTitle"
      :errors="errors"
      :editFieldsConfig="modalType === 'edit' ? editFieldsConfig : null"
      @submit="addOrEditQuestion"
      @close="close"
    ></QuestionForm>
  </Modal>
</template>

<script>
import styled from 'vue-styled-components';
import Modal from '@/common/Modal.vue';
import QuestionForm from '@/components/QuestionForm.vue';
import { TitleH3 } from '@/common/styledComponents';

const Title = styled(TitleH3)`
  width: 100%;
  padding: 30px 0 30px 60px;
  margin: 0;
  text-align: left;
  font-weight: 600;
  box-sizing: border-box;
  background-color: var(--bg-color);
`;

const getModalTitles = modalType => {
  switch (modalType) {
    case 'add':
      return { title: 'Add new question', submitTitle: 'Save' };
    case 'edit':
      return { title: 'Edit question', submitTitle: 'Update' };
    default:
      return {};
  }
};

const editFieldsConfig = ['answer', 'value'];

export default {
  name: 'addOrEditQuestion',
  data: () => {
    return {
      errors: {
        text: {
          required: false,
        },
        answer: {
          required: false,
        },
      },
      editFieldsConfig,
    };
  },
  props: ['isShown', 'question', 'modalType'],
  components: {
    Modal,
    Title,
    QuestionForm,
  },
  computed: {
    titles: function() {
      return getModalTitles(this.modalType);
    },
  },
  methods: {
    close() {
      this.errors = {
        text: {
          required: false,
        },
        answer: {
          required: false,
        },
      };

      this.$store.dispatch('form/hideForm');
    },
    addOrEditQuestion(question) {
      if (this.modalType === 'add') {
        this.$store.dispatch('question/addQuestion', question);
      }

      if (this.modalType === 'edit') {
        this.$store.dispatch('question/updateQuestion', question);
      }

      this.close();
    },
  },
};
</script>
