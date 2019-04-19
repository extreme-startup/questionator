<template>
  <transition name="modal-fade">
    <ModalWrapper>
      <ModalContent>
        <header>
          <ModalCloseBtn @click="close"><v-icon>close</v-icon></ModalCloseBtn>
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
  border-radius: 4px;
  background: var(--btn-color);
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  overflow-x: auto;
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
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
