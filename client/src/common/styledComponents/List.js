import styled from 'vue-styled-components';

// export const List = styled.div`
export const List = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    flex: 1 0 calc(21%);
    text-decoration: none;
  }
`;

export const ListItem = styled.div`
  border: 1px solid #979797;
  min-height: 200px;
  margin: 0 10px 10px 0;
  padding: 8px 14px;
  font-size: 18px;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .bottomItem {
    margin-top: auto;
    margin-bottom: 0;
  }
`;

export const ListItemTitle = styled.h4`
  font-weight: 500;
  margin: 0 0 8px;
`;
