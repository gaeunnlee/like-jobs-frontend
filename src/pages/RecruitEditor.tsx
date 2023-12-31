import { styled } from "styled-components";
import { ImUser } from "react-icons/im";
import { UserInfo } from "../static/data/UserInfo";
import { useNavigate } from "react-router-dom";
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
const Textarea = styled.textarea`
  border: 0;
  height: 150px;
  font-size: 17px;
  resize: none;
  &:focus {
    outline: 0;
  }
`;
const Select = styled.select`
  width: 200px;
  padding: 15px;
  border-radius: 10px;
  font-size: 17px;
  border: 1.5px solid #dcdcdc;
  &:focus {
    border: 1.5px solid ${(props) => props.theme.primary};
    outline: 0;
  }
  option {
    padding: 10px;
  }
`;

interface PostProps {
  companyName: string;
  title: string;
  job: string;
  education: string;
  career: string;
}

export default function RecruitEditor() {
  const token = useRecoilValue(LoginStateAtom);
  const [post, setPost] = useState<PostProps>({
    title: "",
    companyName: "",
    education: "",
    job: "ENTERPRISE",
    career: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!token.state) {
      navigate("/");
    }
  }, []);
  const handlePost = () => {
    fetch("/recruit/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(post),
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        console.log(data);

        alert("등록되었습니다");
        navigate("/my-page");
      });
  };
  return (
    <Wrapper>
      <Container>
        <InfoContainer>
          <PageTitle>채용공고 업로드</PageTitle>
          <BoxesContainer>
            <BoxContainer>
              <BoxTitle>회사명</BoxTitle>
              <Box>
                <Input
                  type="text"
                  placeholder="회사명"
                  value={post.companyName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPost((prev) => {
                      return { ...prev, companyName: e.target.value };
                    });
                  }}
                />
              </Box>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>제목</BoxTitle>
              <Box>
                <Input
                  type="text"
                  placeholder="제목"
                  value={post.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPost((prev) => {
                      return { ...prev, title: e.target.value };
                    });
                  }}
                />
              </Box>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>분야</BoxTitle>
              <Box>
                <Select
                  name="career"
                  value={post.job}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setPost((prev) => {
                      return { ...prev, job: e.target.value };
                    });
                  }}
                >
                  <option value="ENTERPRISE">기획</option>
                  <option value="DESIGN">디자인</option>
                  <option value="MARKETING">마케팅</option>
                  <option value="ENGINEERING">엔지니어링</option>
                  <option value="FOOD">식·음료</option>
                  <option value="EDUCATION">교육</option>
                </Select>
              </Box>
            </BoxContainer>
            <BoxContainer>
              <BoxTitle>지원 자격</BoxTitle>
              <Box>
                <Select
                  name="education"
                  value={post.education}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setPost((prev) => {
                      return { ...prev, education: e.target.value };
                    });
                  }}
                >
                  <option value="HIGH_SCHOOL">고등학교 졸업</option>
                  <option value="UNIVERSITY">대학교 졸업</option>
                </Select>
                <Input
                  type="text"
                  placeholder="경력"
                  value={post.career}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPost((prev) => {
                      return { ...prev, career: e.target.value };
                    });
                  }}
                />
              </Box>
            </BoxContainer>
          </BoxesContainer>
        </InfoContainer>
        <ButtonsContainer>
          <ResumeModifyButton
            onClick={() => {
              handlePost();
            }}
          >
            등록하기
          </ResumeModifyButton>
        </ButtonsContainer>
      </Container>
    </Wrapper>
  );
}
