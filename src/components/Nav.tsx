import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FiMenu, FiChevronRight } from "react-icons/fi";
import { RxTriangleDown } from "react-icons/rx";
import Login from "../pages/Login";
import { useState } from "react";
import SignUp from "../pages/SignUp";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { LoginProps } from "../props/LoginProps";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100px;
  padding: 10px 0;
  align-items: center;
  border-bottom: 1px solid #e4e5ed;
`;
const Container = styled.div`
  width: 1200px;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled(Link)`
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
`;
const LogIn = styled.button`
  background-color: ${(props) => props.theme.primary};
  padding: 8px 18px;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
`;
const LogOut = styled.button`
  font-size: 14px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const CategoryAll = styled.span`
  display: flex;
  align-items: center;
  span {
    font-weight: bold;
    font-size: 17px;
  }
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
`;
const Category = styled(Link)<{ active: boolean }>`
  font-size: 17px;
  color:  ${props => props.active && props.theme.primary};
`;
const ServiceButton = styled.p`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export default function Nav() {
  const [showLogin, setShowLogin] = useState<boolean>();
  const [showSignUp, setShowSignUp] = useState<boolean>();
  const location = useLocation();
  const token = useRecoilValue(LoginStateAtom);
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(LoginStateAtom);
  const handleOpenModal = (type: string, isActive: boolean) => {
    if (type === "Login") {
      setShowLogin(isActive);
    } else if (type === "SignUp") {
      setShowSignUp(isActive);
    }
  };
  const handleLogout = () => {
    alert("로그아웃되었습니다");
    setLogin((prev: LoginProps) => {
      return {
        ...prev,
        state: false,
        authority:"",
      };
    });
    navigate("/");
  };
  const handleClickMypage = () => {
    if (!token.state) {
      setShowLogin(true);
    }
  };
  return (
    <Wrapper>
      {showLogin && <Login handleOpenModal={handleOpenModal} />}
      {showSignUp && <SignUp handleOpenModal={handleOpenModal} />}
      <Container>
        <Top>
          <Logo to="/">LIKE JOBS</Logo>
          {token.state ? (
            <LogOut
              onClick={() => {
                handleLogout();
              }}
            >
              로그아웃
            </LogOut>
          ) : (
            <LogIn
              onClick={() => {
                setShowLogin(true);
              }}
            >
              로그인
            </LogIn>
          )}
        </Top>
        <Bottom>
          <CategoryContainer>
            <CategoryAll>
              <FiMenu />
              {/* <span>전체 카테고리</span> */}
              {/* <RxTriangleDown /> */}
            </CategoryAll>
            <Category to="/" active={location.pathname === "/"}>
              채용정보
            </Category>
            <Category
              active={location.pathname === "/my-page"|| location.pathname === "/resume"}
              onClick={() => {
                handleClickMypage();
              }}
              to={token.state && "my-page"}
            >
              마이페이지
            </Category>
          </CategoryContainer>
          <ServiceButton>
            취업은 역시,&nbsp;<strong>라이크 잡스</strong>에서!
            {/* <FiChevronRight /> */}
          </ServiceButton>
        </Bottom>
      </Container>
    </Wrapper>
  );
}
