import styled from 'vue-styled-components';

export const SessionContainer = styled.div`
  padding-bottom: 15px;
`;

export const ButtonList = styled.div`
  margin: 35px 0;
  display: flex;

  & > * {
    margin-right: 40px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    border: solid 1px var(--btn-bg);
  }

  th {
    font-size: 1.2rem;
    text-align: left;
    font-weight: 500;
  }

  td {
    padding: 12px 8px;
    border-bottom: 1px solid var(--btn-bg);
    background-color: var(--bg);
    user-select: none;
  }

  td > a {
    text-decoration: none;
    font-size: 12px;
  }
`;

const TableRowProps = { deleted: Boolean };
export const TableRow = styled('tr', TableRowProps)`
  opacity: ${props => (props.deleted ? 0.3 : 1)};
  cursor: default;
`;
export const ColumnTitle = styled.div`
  padding: 8px;
`;
