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

const Title = styled('h1')`
  width: 100%;
  padding: 30px 0 30px 60px;
  margin: 0;
  text-align: left;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  box-sizing: border-box;
  background-color: var(--btn-color);
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
        value: {
          required: false,
          isNumber: false,
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
        value: {
          required: false,
          isNumber: false,
        },
      };

      this.$store.dispatch('form/hideForm');
    },
    addOrEditQuestion(question) {
      if (this.modalType === 'add') {
        this.$store.dispatch('question/addQuestion', {
          ...question,
          contestId: this.$route.params.id,
        });
      }

      if (this.modalType === 'edit') {
        this.$store.dispatch('question/updateQuestion', {
          ...question,
          contestId: this.$route.params.id,
        });
      }

      this.close();
    },
  },
};
</script>
