import styled from "styled-components";

const PageFooter = () => {
  return (
    <PageFooterNaviagtion>
      <CheckInOutBar>
        <CheckbarContent></CheckbarContent>
      </CheckInOutBar>
    </PageFooterNaviagtion>
  );
};

export default PageFooter;

const PageFooterNaviagtion = styled.div`
  bottom: 0;
  position: sticky;
`;

const CheckInOutBar = styled.div`
  bottom: 0;
  background: #fff;
  padding-top: 15px;
  padding-bottom: 15px;
`;
const CheckbarContent = styled.div`
  display: flex;
  align-items: center;
  right: 0;
  justify-content: flex-end;
  // margin-right: 260px;
  @media (max-width: 576px) {
    // margin-right: 120px;
    gap: 10px;
  }
  position: relative;
  padding-right: 20px;
  gap: 20px;
  flex-wrap: wrap;
`;
