<template>
  <styled-header>
    <div>
      <styled-link hre="/">Questionator</styled-link>
    </div>
    <div>
      <styled-search placeholder="Search" />
    </div>
    <div>
      <styled-profile id="profile" href="/">Profile</styled-profile>
    </div>
  </styled-header>
</template>

<script>
import styled from 'vue-styled-components';
import { Header, Search } from '../common/styledComponents';

const Link = styled.a`
  font-size: 20px;
  font-weight: 900;
`;

const ProfileLink = styled.a`
  font-size: 18px;
`;

export default {
  name: 'Header',
  components: {
    'styled-header': Header,
    'styled-link': Link,
    'styled-profile': ProfileLink,
    'styled-search': Search,
  },
};
</script>
