import { styled } from "styled-components";
import { ImUser } from "react-icons/im";
import { UserInfo } from "../static/data/UserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "../state/LoginState";

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
`;
const ResumeModifyButton = styled.button`
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
const Input = styled.input`
  height: 30px;
  border: 0;
  border-bottom: solid #dcdcdc 2px;
  font-size: 17px;
  padding: 5px;
  &:focus {
    outline: 0;
    border-bottom: solid ${(props) => props.theme.primary} 2px;
    transition: 0.5s;
  }
`;

const AddCareerButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  width: 100px;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-self: end;
  text-align: center;
  justify-content: center;
`;

const CareerItem = styled.div`
  display: flex;
  gap: 10px;
`;
const CareerDate = styled.span``;
const CareerCompany = styled.span``;
interface UserInfoProps {
  authority: string;
  username: string;
  password: string;
  name: string;
  gender: string;
  phoneNumber: string;
  email: string;
  education: string;
  university: string;
  major: string;
}

interface CareerProps {
  startdate: string;
  quitdate: string;
  companyname: string;
}

interface ResumeInfoProps {
  recruitTitle: string;
  careerList: CareerProps[];
}

export default function ResumeEditor() {
  const token = useRecoilValue(LoginStateAtom);
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  const [careerList, setCareerList] = useState<CareerProps[]>([]);
  const [careerItem, setCareerItem] = useState<CareerProps>({
    startdate: "",
    quitdate: "",
    companyname: "",
  });
  const [resumeInfo, setResumeInfo] = useState<ResumeInfoProps>();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setResumeInfo((prev:any) => {
      return { ...prev, recruitTitle: location.state.title };
    });
    if (!token.state) {
      navigate("/");
    }
    fetch("/member/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setUserInfo(data);
      });
  }, []);

  const handleAddCareer = (e: React.MouseEvent<HTMLButtonElement>) => {
    careerList.push(careerItem);
    setCareerItem({
      startdate: "",
      quitdate: "",
      companyname: "",
    });
    setResumeInfo((prev:any)=>{return({...prev, careerList: careerList})})
  };
  const handleSaveResume = () => {
    
    fetch("/member/resume/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(resumeInfo),
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        console.log(data);

        alert("등록되었습니다");
        navigate("/");
      });

  };
  return (
    <Wrapper>
      <Container>
        <InfoContainer>
          <PageTitle>이력서 등록</PageTitle>
          <BoxesContainer>
            <BoxContainer>
              <BoxTitle>기본 정보</BoxTitle>
              <MyInfoBox>
                <ProfileWrapper>
                  <ImUser />
                </ProfileWrapper>
                <TextInfoContainer>
                  <BasicInfo>
                    <Name>{userInfo?.name}</Name>
                    <GenderAge>
                      {userInfo?.gender === "male" ? "남자" : "여자"}
                    </GenderAge>
                  </BasicInfo>
                  <InfoItem>
                    <InfoName>연락처</InfoName>
                    <InfoDesc>{userInfo?.phoneNumber}</InfoDesc>
                  </InfoItem>
                  <InfoItem>
                    <InfoName>이메일</InfoName>
                    <InfoDesc>{UserInfo.email}</InfoDesc>
                  </InfoItem>
                </TextInfoContainer>
              </MyInfoBox>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>학력</BoxTitle>
              <Box>
                <Accent>
                  {userInfo?.education === "UNIVERSITY"
                    ? "대학교 졸업"
                    : "고등학교 졸업"}
                </Accent>
                <Desc>{userInfo?.university}</Desc>
              </Box>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>경력</BoxTitle>
              <Box>
                {careerList.map((item) => {
                  return (
                    <CareerItem>
                      <CareerDate>
                        {item.startdate} ~ {item.quitdate}
                      </CareerDate>
                      <CareerCompany>{item.companyname}</CareerCompany>
                    </CareerItem>
                  );
                })}
                <hr />
                <Input
                  type="text"
                  placeholder="시작 (ex. 2021-11)"
                  value={careerItem.startdate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCareerItem((prev) => {
                      return { ...prev, startdate: e.target.value };
                    });
                  }}
                />
                <Input
                  type="text"
                  placeholder="종료 (ex. 2023-04)"
                  value={careerItem.quitdate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCareerItem((prev) => {
                      return { ...prev, quitdate: e.target.value };
                    });
                  }}
                />
                <Input
                  type="text"
                  placeholder="회사명"
                  value={careerItem.companyname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCareerItem((prev) => {
                      return { ...prev, companyname: e.target.value };
                    });
                  }}
                />
                <AddCareerButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handleAddCareer(e);
                  }}
                >
                  추가
                </AddCareerButton>
              </Box>
            </BoxContainer>
          </BoxesContainer>
        </InfoContainer>
        <ButtonsContainer>
          <ResumeModifyButton
            onClick={() => {
              handleSaveResume();
            }}
          >
            등록하기
          </ResumeModifyButton>
        </ButtonsContainer>
      </Container>
    </Wrapper>
  );
}
