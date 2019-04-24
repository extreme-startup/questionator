<template>
  <v-container my-2>
    <v-item-group class="my-4">
      <v-btn color="info mx-0" @click="showAddQuestion">Add new question</v-btn>
    </v-item-group>
    <DataTable :columns="columns" :data="questions" :loading="isFetching" :error="error" />
    <AddOrEditQuestion
      v-if="isFormShown && (modalType === 'edit' || modalType === 'add')"
      :question="question"
      :modalType="modalType"
    />
    <DeleteQuestion v-if="isFormShown && modalType === 'delete'" :question="question" />
  </v-container>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import AddOrEditQuestion from '@/components/AddOrEditQuestion.vue';
import DeleteQuestion from '@/components/DeleteQuestion.vue';

const columnsConfig = [
  { value: 'text', text: 'Question' },
  { value: 'value', text: 'Points', align: 'right' },
  { text: '', value: 'text', sortable: false },
];

export default {
  name: 'question-tab',
  components: {
    DataTable,
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
