import { styled } from "styled-components";
import { recruitPost } from "../static/data/recruitPost";
import { RecruitPostDetail } from "../static/data/RecruitPostDetail";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const Container = styled.div`
  margin-top: 120px;
  width: 1200px;
`;

const PageTitle = styled.h1`
  font-size: 30px;
`;

const Content = styled.div`
  display: flex;
  width: 1200px;
`;

const RecruitInfo = styled.div``;

const CompanyInfo = styled.div``;
const RecruitCompany = styled.p``;
const RecruitTitle = styled.h1``;
const RecruitCondition = styled.div``;

export default function RecruitDetail() {
  return (
    <Wrapper>
      <Container>
        <PageTitle>채용정보</PageTitle>
        <Content>
          <RecruitInfo>
            <RecruitCompany>{RecruitPostDetail.companyName}</RecruitCompany>
            <RecruitTitle>{RecruitPostDetail.title}</RecruitTitle>
            <RecruitCondition></RecruitCondition>
          </RecruitInfo>
          <CompanyInfo></CompanyInfo>
        </Content>
      </Container>
    </Wrapper>
  );
}
