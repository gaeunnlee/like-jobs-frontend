import { styled } from "styled-components";
import { recruitInfo } from "../static/data/recruitInfo";
import { recruitPost } from "../static/data/recruitPost";
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  padding: 20px 0;
  height: 100vh;
`;

const Container = styled.div`
  margin-top: 120px;
  width: 1200px;
`;
const CategoryContainer = styled.div`
  display: flex;
  gap: 15px;
`;
const CategoryItem = styled.button`
  font-size: 15px;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  &.selectedCategory {
    color: ${(props) => props.theme.primary};
    border-bottom: 2px solid ${(props) => props.theme.primary};
    transition: 0.5s;
  }
`;
const RecruitPostContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
`;
const RecruitPostItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  height: 150px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const RecruitPostCompany = styled.strong``;
const RecruitPostTitle = styled.p``;
const RecruitPostTagContainer = styled.div`
  display: flex;
  gap: 5px;
`;
const RecruitPostTag = styled.span`
  background-color: #f4f6fa;
  color: #373f57;
  font-size: 14px;
  padding: 4px;
`;
const ApplyButton = styled(Link)`
  align-self: flex-end;
  border: 1px solid #875050;
  color: #875050;
  padding: 3px 6px;
  border-radius: 3px;
`;
interface PostProps {
  id: number;
  company: {
    id: number;
    companyId: string;
    password: string;
    registNum: number;
    companyName: string;
    authority: string;
  };
  title: string;
  job: string;
  education: string;
  career: string;
}
export default function RecruitInfo() {
  const token = useRecoilValue(LoginStateAtom);
  const [recruitPosts, setRecruitPosts] = useState<PostProps[]>();

  const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    document
      .getElementsByClassName("selectedCategory")[0]
      ?.classList.remove("selectedCategory");
    e.currentTarget.classList.add("selectedCategory");
  };

  useEffect(() => {
    fetch("/recruit/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setRecruitPosts(data.content);
      });
  }, []);
  return (
    <Wrapper>
      <Container>
        <CategoryContainer>
          {recruitInfo.map((item) => {
            return (
              <CategoryItem
                className={item.name === "전체" ? "selectedCategory" : ""}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleCategoryClick(e)
                }
              >
                #{item.name}
              </CategoryItem>
            );
          })}
        </CategoryContainer>
        <RecruitPostContainer>
          {recruitPosts?.map((item) => {
            return (
              <RecruitPostItem>
                <RecruitPostCompany>
                  {item.company.companyName}
                </RecruitPostCompany>
                <RecruitPostTagContainer>
                  <RecruitPostTag>{item.education}</RecruitPostTag>
                  <RecruitPostTag>{item.career}</RecruitPostTag>
                </RecruitPostTagContainer>
                <RecruitPostTitle>{item.title}</RecruitPostTitle>
                <ApplyButton
                  to={`/recruit/${item.id}`}
                  state ={{
                    title: item.title
                  }}
                >
                  {token.authority === "ROLE_USER" ? "지원하기" : "→"}
                </ApplyButton>
              </RecruitPostItem>
            );
          })}
        </RecruitPostContainer>
      </Container>
    </Wrapper>
  );
}
