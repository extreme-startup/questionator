import styled from 'vue-styled-components';

const btnProps = { primary: Boolean };

const Button = styled('button', btnProps)`
  font-size: 12px;
  padding: 8px 45px;
  border: none;
  border-radius: 0;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => (props.primary ? 'yellow' : '#4F4F4F')};
  color: ${props => (props.primary ? 'grey' : '#FFFFFF')};
`;

export default Button;
