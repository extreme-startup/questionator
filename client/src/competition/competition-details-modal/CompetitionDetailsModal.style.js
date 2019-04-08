import styled from 'vue-styled-components';
import Button from '../../common/styledComponents/Button';

export const ControlWrapper = styled('div')`
  position: relative;
  padding-top: 5px;
  padding-bottom: 30px;
  text-align: left;
`;

export const ControlLabel = styled('label')`
  display: block;
`;

export const CancelButton = styled(Button)`
  margin-right: 10px;
`;

export const DetailsFieldError = styled('div')`
  position: absolute;
  left: 0;
  bottom: 0;
  color: #f15151;
`;
