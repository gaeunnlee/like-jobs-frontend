import { useState } from "react";
import { styled } from "styled-components";
import Modal from "../components/Modal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { useNavigate } from "react-router-dom";

const ServiceTitle = styled.p`
  font-size: 40px;
  font-family: "LINESeedBd";
`;
const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 20px;
  padding: 20px;
  margin-bottom: 30px;
`;
const UserContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 5px;
`;
const UserLabel = styled.label`
  padding: 5px 0;
  width: 148px;
  font-size: 15px;
  &.border-right {
    box-sizing: content-box;
    border-right: 1px solid ${(props) => props.theme.primary};
  }
  &:hover {
    cursor: pointer;
  }
  &.checked {
    background-color: ${(props) => props.theme.primary};
    color: #fff;
  }
`;
const UserInput = styled.input`
  display: none;
`;

const IdInput = styled.input`
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
const PwInput = styled(IdInput)``;
const LoginButton = styled.input`
    background-color: ${(props) => props.theme.primary};
    color: #fff;
    padding: 10px;
    border-radius: 50px;
    font-family: 'LINESeed-Bd'
    font-weight: bold;
    font-size: 18px;
    &:hover {
        filter: grayscale(30%);
        transition: 0.2s;
    }
`;
const SignUpButton = styled.button``;

interface LoginProps {
  username: string;
  password: string;
}

export default function Login({
  handleOpenModal,
}: {
  handleOpenModal(type: string, isActive: boolean): void;
}) {
  const [userType, setUserType] = useState("개인");
  const setLogin = useSetRecoilState(LoginStateAtom);
  const token = useRecoilValue(LoginStateAtom);
  const [loginSuccesss, setLoginSuccess] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginProps>({
    username: "",
    password: "",
  });
  const isActiveModal = (type: string, isActive: boolean) => {
    handleOpenModal(type, isActive);
  };
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginInfo.username.length > 0 && loginInfo.password.length > 0) {
      if (userType === "개인") {
        fetch("/auth/member/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            setLogin(data)
            setLogin((prev:any)=> {return {
              ...prev,
              state: true
            }})
            isActiveModal("Login", false);
            alert("로그인 완료");
          });

        
      } else {
        fetch("/auth/company/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "companyId": loginInfo.username,
            "password": loginInfo.password
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            setLogin(data)
            setLogin((prev:any)=> {return {
              ...prev,
              state: true
            }})
            isActiveModal("Login", false);
            alert("로그인 완료");
          });
      }
    } else {
      alert("아이디 또는 비밀번호를 입력해주세요");
    }
  };
  const handleUserChecked = (e: React.MouseEvent<HTMLLabelElement>) => {
    let user = "";
    document.getElementsByClassName("checked")[0].classList.remove("checked");
    e.currentTarget.classList.add("checked");
    setUserType(e.currentTarget.innerText);
    if (e.currentTarget.innerText === "개인") {
      user = "person";
    } else {
      user = "company";
    }
    setLoginInfo((prev) => {
      return { ...prev, user };
    });
  };
  return (
    <Modal isActiveModal={isActiveModal}>
      <ServiceTitle>LIKE JOBS</ServiceTitle>
      <LoginContainer
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleLogin(e);
        }}
      >
        <UserContainer>
          <UserLabel
            className="border-right checked"
            onClick={(e: React.MouseEvent<HTMLLabelElement>) =>
              handleUserChecked(e)
            }
          >
            <UserInput checked name="user" type="radio" />
            개인
          </UserLabel>
          <UserLabel
            onClick={(e: React.MouseEvent<HTMLLabelElement>) =>
              handleUserChecked(e)
            }
          >
            <UserInput name="user" type="radio" />
            기업
          </UserLabel>
        </UserContainer>
        <IdInput
          type="text"
          placeholder="아이디"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginInfo((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
        />
        <PwInput
          type="password"
          placeholder="비밀번호"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginInfo((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <LoginButton type="submit" value="로그인" />
        <SignUpButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            isActiveModal("Login", false);
            isActiveModal("SignUp", true);
          }}
        >
          회원이 아니신가요? <u>회원가입하기</u>
        </SignUpButton>
      </LoginContainer>
    </Modal>
  );
}
