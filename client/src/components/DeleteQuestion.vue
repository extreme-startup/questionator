<template>
  <Dialog
    :agree="deleteQuestion"
    :disagree="close"
    :is-open="isShown"
    title="Confirm delete"
    :text="text"
    agreeName="Confirm"
  />
</template>

<script>
import Dialog from '@/components/ConfirmDialog';

export default {
  name: 'deleteQuestion',
  props: ['isShown', 'question'],
  components: {
    Dialog,
  },
  computed: {
    text() {
      return `Are you sure you want to delete ${this.question.text} question?`;
    },
  },
  methods: {
    close() {
      this.$store.dispatch('form/hideForm');
    },
    deleteQuestion() {
      this.$store.dispatch('question/deleteQuestion', {
        ...this.question,
        contestId: this.$route.params.id,
      });
      this.close();
    },
  },
};
</script>
