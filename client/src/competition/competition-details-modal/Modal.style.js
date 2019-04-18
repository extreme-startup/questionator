import styled from 'vue-styled-components';

export const ModalCloseButton = styled('button')`
  position: absolute;
  top: 0;
  right: 0;

  margin: 0;
  padding: 10px;

  background-color: transparent;
  border: none;

  font-size: 24px;

  &:active {
    background-color: lightgrey;
  }
`;
