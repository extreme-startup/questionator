import styled from 'vue-styled-components';

export const ModalWrapper = styled('article')`
  box-sizing: border-box;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(128, 128, 128, 0.5);
`;

export const ModalContent = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

  width: 30vw;
  max-height: 100vh;
  overflow: auto;

  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;

  border: 10px solid #bada55;
  border-radius: 2px;

  background-color: #fff;
`;

export const ModalHeader = styled('header')`
  position: relative;
`;

export const ModalTitle = styled('h2')`
  margin-top: 0;

  font-style: italic;
  font-weight: bold;
  font-size: 40px;
  color: #00ff00;
  text-decoration: underline;
  text-align: left;
`;

export const ModalCloseButton = styled('button')`
  position: absolute;
  top: 0;
  right: 0;

  margin: 0;
  padding: 10px;

  background-color: transparent;
  border: none;

  font-size: 40px;

  &:active {
    background-color: lightgrey;
  }
`;

export const ModalFooter = styled('footer')`
  text-align: right;
`;
