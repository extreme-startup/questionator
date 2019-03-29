import styled from 'vue-styled-components';

const btnProps = { primary: Boolean };

const Button = styled('button', btnProps)`
  font-size: 12px;
  padding: 8px 45px;
  border: none;
  border-radius: 0;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => (props.primary ? 'var(--btn-bg-primary)' : 'var(--btn-bg)')};
  color: ${props => (props.primary ? 'var(--btn-color-primary)' : 'var(--btn-color)')};

  &:disabled {
    opacity: 0.6;
  }
`;

export default Button;
