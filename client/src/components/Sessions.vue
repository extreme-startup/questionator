<template>
  <styled-wrapper>
    <styled-title>
      Ongoing sessions
    </styled-title>
    <styled-list>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <styled-div>44 members</styled-div>
        <styled-div>Trainer</styled-div>
        <styled-div class="bottomItem">Start time</styled-div>
      </styled-list-item>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <styled-div>44 members</styled-div>
        <styled-div>Trainer</styled-div>
        <styled-div class="bottomItem">Start time</styled-div>
      </styled-list-item>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <styled-div>44 members</styled-div>
        <styled-div>Trainer</styled-div>
        <styled-div class="bottomItem">Start time</styled-div>
      </styled-list-item>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <styled-div>44 members</styled-div>
        <styled-div>Trainer</styled-div>
        <styled-div class="bottomItem">Start time</styled-div>
      </styled-list-item>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <styled-div>44 members</styled-div>
        <styled-div>Trainer</styled-div>
        <styled-div class="bottomItem">Start time</styled-div>
      </styled-list-item>
    </styled-list>
  </styled-wrapper>
</template>

<script>
import styled from 'vue-styled-components';
import { List, ListItem, Section, TitleH3, ListItemTitle } from '../common/styledComponents';

const Title = styled(TitleH3)`
  margin: 0 0 25px;
`;

const ListDiv = styled.div`
  margin-bottom: 8px;
`;

export default {
  name: 'Sessions',
  components: {
    'styled-wrapper': Section,
    'styled-title': Title,
    'styled-list': List,
    'styled-list-item': ListItem,
    'styled-list-title': ListItemTitle,
    'styled-div': ListDiv,
  },
};
</script>
