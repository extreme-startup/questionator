<template>
  <Fragment>
    <ButtonList>
      <AddQuestion>
        <template slot-scope="props">
          <Button @click="props.clickHandler">Add new question</Button>
        </template>
      </AddQuestion>
      <Button secondary>Question library</Button>
    </ButtonList>
    <DataTable :columns="columns" :data="questions" />
    <div v-if="fetchingStatus.isFetching">Loading....</div>
    <div v-if="fetchingStatus.error">{{ fetchingStatus.error }}</div>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import styled from 'vue-styled-components';
import { Button } from '@/common/styledComponents';
import DataTable from '@/components/DataTable.vue';
import AddQuestion from '@/components/AddQuestion.vue';

const ButtonList = styled.div`
  margin: 35px 0;
  display: flex;

  & > * {
    margin-right: 40px;
  }
`;

export default {
  name: 'question-tab',
  components: {
    Fragment,
    DataTable,
    ButtonList,
    Button,
    AddQuestion,
  },
  data: () => ({
    trainingQuestions: [],
    columns: ['Question', 'Category', 'Level'],
  }),
  computed: {
    questions: function() {
      const questions = this.$store.getters['question/questions'];
      return questions.map(question => ({
        text: question.text || '',
        type: question.type || 'None',
        level: question.level || 0,
      }));
    },
    fetchingStatus: function() {
      return this.$store.getters['question/questionsFetchingStatus'];
    },
  },
  async mounted() {
    this.$store.dispatch('question/getQuestions', this.$route.params.id);
  },
};
</script>
