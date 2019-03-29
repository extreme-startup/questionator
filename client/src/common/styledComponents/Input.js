import styled from 'vue-styled-components';

const inputProps = { border: String | Boolean, value: String };

const Input = styled('input', inputProps)`
  width: 300px;
  height: 35px;
  border: ${props => props.border || '1px solid #ccc'};
  background-color: #fff;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

export default Input;
