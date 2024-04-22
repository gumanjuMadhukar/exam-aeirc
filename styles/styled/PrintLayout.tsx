import styled from "styled-components";

export const PrintTableLayout = styled.div`
  width: 100%;
  padding: 30px;
  .header{
    display:flex;
    justify-content:center;
  }
  table {
    width: 100%;
  }
  table,
  th,
  td {
    border: 0.5px solid black;
    border-collapse: collapse;
  }
`;
