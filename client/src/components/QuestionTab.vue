<template>
  <Fragment>
    <ButtonList>
      <AddQuestion>
        <template scope="props">
          <Button @click="props.clickHandler">Add new question</Button>
        </template>
      </AddQuestion>
      <Button secondary>Question library</Button>
    </ButtonList>
    <DataTable :columns="columns" :data="questions" />
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
      if (!this.trainingQuestions) {
        return [];
      }
      return this.trainingQuestions.map(question => ({
        text: question.text || '',
        type: question.type || 'None',
        level: question.level || 0,
      }));
    },
  },
  async mounted() {
    try {
      //TODO: endpoint should be /trainings/{trainig_id}/questions
      this.trainingQuestions = (await this.$http.get('/questions')).data;
    } catch (err) {
      // TODO: log error
    }
  },
};
</script>
