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

export default Header;
