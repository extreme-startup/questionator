import styled from 'vue-styled-components';

const btnProps = { primary: Boolean, secondary: Boolean };

const getButtonFlag = props => {
  const activeFlag = Object.keys(btnProps).find(flag => !!props[flag]);
  return activeFlag ? `-${activeFlag}` : '';
};

const Button = styled('button', btnProps)`
  font-size: 12px;
  padding: 8px 45px;
  border: none;
  border-radius: 0;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => `var(--btn-bg${getButtonFlag(props)})`};
  color: ${props => `var(--btn-color${getButtonFlag(props)})`};

  &:disabled {
    opacity: 0.6;
  }
`;

export default Button;
