<template>
  <styled-wrapper>
    <styled-title>
      Trainings
      <styled-button>Add new training</styled-button>
      <styled-sort-link href="/">Sort by: ???</styled-sort-link>
    </styled-title>
    <styled-list>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <div>23 sessions</div>
      </styled-list-item>
    </styled-list>
  </styled-wrapper>
</template>

<script>
import styled from 'vue-styled-components';
import {
  Button,
  TitleH1,
  Section,
  List,
  ListItem,
  ListItemTittle,
} from '../common/styledComponents';

const Title = styled(TitleH1)`
  margin-bottom: 25px;
  display: flex;
  align-items: center;
`;

const AddTraining = styled(Button)`
  margin-left: 45px;
`;

const SortLink = styled.a`
  margin-left: auto;
  color: var(--text-color);
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;

  &:focus {
    color: var(--text-color);
  }
`;

export default {
  name: 'Trainings',
  components: {
    'styled-wrapper': Section,
    'styled-button': AddTraining,
    'styled-title': Title,
    'styled-list': List,
    'styled-list-item': ListItem,
    'styled-sort-link': SortLink,
    'styled-list-title': ListItemTittle,
  },
};
</script>
