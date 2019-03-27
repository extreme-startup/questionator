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

const Header = styled.header`
  height: 96px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  color: var(--text-color);
  align-items: center;
  background: #fff;
  padding: 0 80px;

  & div {
    margin: 8px;

    &:first-child {
      margin-left: 0;
      margin-right: auto;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  & a {
    color: var(--text-color);
    cursor: pointer;
    text-decoration: none;
  }
`;
const Link = styled.a`
  font-size: 20px;
  font-weight: 900;
`;

const ProfileLink = styled.a`
  font-size: 18px;
`;

const Search = styled.input`
  width: 250px;
  border: none;
  border-radius: 4px;
  background-color: rgba(34, 34, 34, 0.05);
  color: rgba(34, 34, 34, 0.5);
  font-size: 14px;
  padding: 11px 8px 11px 36px;

  &:focus {
    outline: none;
  }
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
