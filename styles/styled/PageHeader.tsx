import styled from 'styled-components';

export const EmployeeContainer = styled.div``;
export const PageHeader = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;
export const PageHeaderNaviagtion = styled.div`
  background: #fff;
  padding: 24px;
`;
export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 480px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
export const SearchBar = styled.div`
  background: #fff;
  margin: 24px;
  height: 64px;
  @media (max-width: 762px) {
    overflow-wrap: anywhere;
    height: auto;
  }
`;
export const SearchBarContent = styled.div`
  padding: 16px;
  line-height: 20px;

  // display: grid;
  // gap: 20px;
  align-items: center;
  // justify-content: center;
`;
export const TableBodyContainer = styled.div`
  padding: 24px;
  padding-top: 0;
`;
