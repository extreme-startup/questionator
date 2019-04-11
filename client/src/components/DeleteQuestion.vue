<template>
  <Modal @close="close">
    <template v-slot:header>
      <ModalTitle>Confirm delete</ModalTitle>
    </template>
    <ModalBody>
      <span>{{ `Are you sure you want to delete ${question.text} question?` }}</span>
      <ModalControlsGroup>
        <ModalCancelButton @click="close">Cancel</ModalCancelButton>
        <ModalDeleteButton @click="deleteQuestion">Confirm</ModalDeleteButton>
      </ModalControlsGroup>
    </ModalBody>
  </Modal>
</template>

<script>
import styled from 'vue-styled-components';
import Modal from '@/common/Modal.vue';

const ModalTitle = styled.h4`
  font-weight: 600;
  font-size: 16px;
  padding: 20px;
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 5px 20px 20px;
  font-size: 14px;
`;

const ModalControlsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
`;

const ModalButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
`;

const ModalCancelButton = styled(ModalButton)`
  border: 1px solid black;
  background-color: white;
  color: black;
`;

const ModalDeleteButton = styled(ModalButton)`
  border: 1px solid red;
  background-color: red;
  color: white;
`;

export default {
  name: 'deleteQuestion',
  props: ['isShown', 'question'],
  components: {
    Modal,
    ModalTitle,
    ModalBody,
    ModalControlsGroup,
    ModalCancelButton,
    ModalDeleteButton,
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
