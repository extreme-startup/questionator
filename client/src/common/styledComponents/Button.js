import styled from 'vue-styled-components';

const btnProps = { primary: Boolean };

const Button = styled('button', btnProps)`
  font-size: 16px;
  padding: 5px 20px;
  border: none;
  border-radius: 0;
  background: ${props => (props.primary ? 'yellow' : 'grey')};
  color: ${props => (props.primary ? 'grey' : 'white')};
`;

export default Button;
