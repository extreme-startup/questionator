<template>
  <div>
    <Button>Add new question</Button>
    <DataTable :columns="columns" :data="questions"/>
  </div>
</template>

<script>
import { Button } from '@/common/styledComponents';
import DataTable from '@/components/DataTable.vue';

export default {
  name: 'question-tab',
  components: {
    DataTable,
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
      // TODO: Remove this mock when '/training' endpoint implemented
      this.training = {
        id: 123,
        name: 'Test training',
        questions: [
          { text: 'some text', category: 'category', level: 1 },
          { text: 'some text2', category: 'category1', level: 2 },
          { text: 'some text1', category: 'category3', level: 2 },
        ],
      };
    }
  },
};
</script>

<style>

</style>
