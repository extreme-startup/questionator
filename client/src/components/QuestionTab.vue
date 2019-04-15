<template>
  <div>
    <ButtonList>
      <Button @click="showAddQuestion">Add new question</Button>
      <Button secondary>Question library</Button>
    </ButtonList>
    <DataTable :columns="columns" :data="questions" />
    <div v-if="isFetching">Loading....</div>
    <div v-if="error">{{ error }}</div>
    <AddOrEditQuestion
      v-if="isFormShown && (modalType === 'edit' || modalType === 'add')"
      :question="question"
      :modalType="modalType"
    />
    <DeleteQuestion v-if="isFormShown && modalType === 'delete'" :question="question" />
  </div>
</template>

<script>
import styled from 'vue-styled-components';
import { Button } from '@/common/styledComponents';
import DataTable from '@/components/DataTable.vue';
import AddOrEditQuestion from '@/components/AddOrEditQuestion.vue';
import DeleteQuestion from '@/components/DeleteQuestion.vue';

const ButtonList = styled.div`
  margin: 35px 0;
  display: flex;

  & > * {
    margin-right: 40px;
  }
`;

const columnsConfig = [{ field: 'text', title: 'Question' }, { field: 'value', title: 'Points' }];

export default {
  name: 'question-tab',
  components: {
    DataTable,
    ButtonList,
    Button,
    AddOrEditQuestion,
    DeleteQuestion,
  },
  data: () => ({
    trainingQuestions: [],
    columns: columnsConfig,
  }),
  computed: {
    questions: function() {
      return this.$store.getters['question/questions'];
    },
    isFetching: function() {
      return this.$store.getters['question/questionsFetchingStatus'].isFetching;
    },
    error: function() {
      return this.$store.getters['question/questionsFetchingStatus'].error;
    },
    modalType: function() {
      return this.$store.getters['form/modalType'];
    },
    isFormShown: function() {
      return this.$store.getters['form/isShown'];
    },
    question: function() {
      return this.$store.getters['form/question'];
    },
  },
  async mounted() {
    this.$store.dispatch('question/getQuestions', this.$route.params.id);
  },
  methods: {
    showAddQuestion() {
      this.$store.dispatch('form/showForm', { payload: null, type: 'add' });
    },
  },
};
</script>
