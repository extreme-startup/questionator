<template>
  <transition name="modal-fade">
    <ModalWrapper>
      <ModalContent>
        <header>
          <ModalCloseBtn @click="close">x</ModalCloseBtn>
          <slot name="header">Default title</slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </ModalContent>
    </ModalWrapper>
  </transition>
</template>

<style>
.modal-fade-enter {
  opacity: 0;
}

.modal-fade-enter-active {
  transition: opacity 0.5s ease;
}
</style>

<script>
import styled from 'vue-styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--btn-color);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  overflow-x: auto;
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  color: var(--btn-color-primary);
  cursor: pointer;
  outline: none;
`;

export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
  components: {
    ModalWrapper,
    ModalContent,
    ModalCloseBtn,
  },
};
</script>
