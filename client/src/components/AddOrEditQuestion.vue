<template>
  <Dialog :is-open="isShown" :title="titles.title" maxWidth="600" hideControls>
    <QuestionForm
      :question="question"
      :submitTitle="titles.submitTitle"
      :errors="errors"
      :editFieldsConfig="modalType === 'edit' ? editFieldsConfig : null"
      @submit="addOrEditQuestion"
      @close="close"
    ></QuestionForm>
  </Dialog>
</template>

<script>
import Dialog from '@/components/ConfirmDialog';
import QuestionForm from '@/components/QuestionForm.vue';

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
    Dialog,
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
