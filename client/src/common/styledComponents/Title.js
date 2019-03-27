import styled from 'vue-styled-components';

const Title = styled('h1', { color: String })`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.color || 'grey'};
`;

export default Title;
