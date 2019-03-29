import styled from 'vue-styled-components';

const paragraphProps = { color: String };

const Paragraph = styled('p', paragraphProps)`
  color: ${props => props.color || '#4d4d4d'};
`;

export default Paragraph;
