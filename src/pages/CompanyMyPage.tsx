import { styled } from "styled-components";
import { ImUser } from "react-icons/im";
import { CompanyInfo } from "../static/data/CompanyInfo";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const Container = styled.div`
  margin-top: 130px;
  width: 1200px;
  display: flex;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-size: 30px;
`;
const BoxesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
  width: 900px;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BoxTitle = styled.h2`
  font-size: 20px;
`;

const Box = styled.div`
  padding: 30px;
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  font-size: 17px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MyInfoBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;
const ProfileWrapper = styled.div`
  font-size: 110px;
  background-color: #f8f8f8;
  color: #e8e8e8;
  border: 1px solid #e8e8e8;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 10px;
`;

const TextInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const BasicInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;
const Name = styled.strong`
  font-size: 20px;
`;
const GenderAge = styled.span``;
const InfoItem = styled.div``;
const InfoName = styled.span`
  margin-right: 10px;
  color: #777;
`;
const InfoDesc = styled.span``;
const Accent = styled.p`
  color: ${(props) => props.theme.primary};
  font-weight: bold;
`;
const Desc = styled.p`
  line-height: 140%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  position: fixed;
  right: 120px;
  z-index: 0;
`;
const ResumeModifyButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
  width: 230px;
  height: 70px;
  font-size: 17px;
  color: #fff;
  border-radius: 10px;
`;

export default function CompanyMyPage() {
    const token = useRecoilValue(LoginStateAtom)
    const navigate = useNavigate();
    useEffect(()=>{
        if (!token.state) {
            navigate('/')
        }
    },[])
  return (
    <Wrapper>
      <Container>
        <InfoContainer>
          <PageTitle>마이페이지</PageTitle>
          <BoxesContainer>
            <BoxContainer>
              <BoxTitle>기업 정보</BoxTitle>
              <MyInfoBox>
                <TextInfoContainer>
                  <BasicInfo>
                    <Name>{CompanyInfo.companyName}</Name>
                  </BasicInfo>
                  <InfoItem>
                    <InfoName>사업자등록번호</InfoName>
                    <InfoDesc>{CompanyInfo.companyNumber}</InfoDesc>
                  </InfoItem>
                </TextInfoContainer>
              </MyInfoBox>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>채용 공고</BoxTitle>
              <Box>
                {CompanyInfo.recruitPosts.map((item) => {return(
                  <Desc>{item}</Desc>
                )})}
                
              </Box>
            </BoxContainer>
          </BoxesContainer>
        </InfoContainer>
        <ButtonsContainer>
          <ResumeModifyButton to="/post/recruit">채용 공고 업로드</ResumeModifyButton>
        </ButtonsContainer>
      </Container>
    </Wrapper>
  );
}
