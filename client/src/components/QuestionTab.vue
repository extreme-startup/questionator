<template>
  <Fragment>
    <ButtonList>
      <Button>Add new question</Button>
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
  },
  data: () => ({
    training: {},
    columns: ['Question', 'Category', 'Level'],
  }),
  computed: {
    questions: function() {
      if (!this.training || !this.training.questions) {
        return [];
      }
      return this.training.questions.map(question => [
        question.text || '',
        question.category || 'None',
        question.level || 0,
      ]);
    },
  },
  async mounted() {
    try {
      this.training = await this.$http.get(`/training/${this.$route.params.id}`);
    } catch (err) {
      /*
      TODO: Remove this mock when '/training' endpoint implemented
      this.training = {
        id: 123,
        name: 'Test training',
        questions: [
          { text: 'some text', category: 'category', level: 1 },
        ],
      };
      */
    }
  },
};
</script>
