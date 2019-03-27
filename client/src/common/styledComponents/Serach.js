import styled from 'vue-styled-components';

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

export default Search;
