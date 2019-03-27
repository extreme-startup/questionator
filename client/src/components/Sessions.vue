<template>
  <styled-wrapper>
    <styled-title>
      Ongoing sessions
    </styled-title>
    <styled-list>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <div>44 members</div>
        <div>Trainer</div>
        <div class="bottomItem">Start time</div>
      </styled-list-item>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <div>44 members</div>
        <div>Trainer</div>
        <div class="bottomItem">Start time</div>
      </styled-list-item>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <div>44 members</div>
        <div>Trainer</div>
        <div class="bottomItem">Start time</div>
      </styled-list-item>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <div>44 members</div>
        <div>Trainer</div>
        <div class="bottomItem">Start time</div>
      </styled-list-item>
      <styled-list-item>
        <styled-list-title>Contest #64747</styled-list-title>
        <div>44 members</div>
        <div>Trainer</div>
        <div class="bottomItem">Start time</div>
      </styled-list-item>
    </styled-list>
  </styled-wrapper>
</template>

<script>
import styled from 'vue-styled-components';
import { List, ListItem, Section, TitleH3, ListItemTittle } from '../common/styledComponents';

const Title = styled(TitleH3)`
  margin-bottom: 25px;
`;

export default {
  name: 'Sessions',
  components: {
    'styled-wrapper': Section,
    'styled-title': Title,
    'styled-list': List,
    'styled-list-item': ListItem,
    'styled-list-title': ListItemTittle,
  },
};
</script>
