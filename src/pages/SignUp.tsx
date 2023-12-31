import { useState } from "react";
import { styled } from "styled-components";
import Modal from "../components/Modal";

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
const GenderContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const GenderLabel = styled.label`
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const GenderInput = styled.input``;

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
const SignUpButton = styled.input`
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
const LoginButton = styled.button``;

interface PersonSignUpProps {
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
interface CompanySignUpProps {
  companyId: string;
  password: string;
  registNum: number;
  companyName: string;
}
export default function SignUp({
  handleOpenModal,
}: {
  handleOpenModal(type: string, isActive: boolean): void;
}) {
  const [userType, setUserType] = useState("개인");
  const [personSignUpInfo, setPersonSignUpInfo] = useState<PersonSignUpProps>({
    username: "",
    password: "",
    phoneNumber: "",
    name: "",
    email: "",
    gender: "",
    major: "",
    education: "",
    university: "",
  });
  const [companySignUpInfo, setCompanySignUpInfo] =
    useState<CompanySignUpProps>({
      companyId: "",
      password: "",
      registNum: 0,
      companyName: "",
    });
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userType ==="개인") {
      fetch("/auth/member/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personSignUpInfo),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          isActiveModal("SignUp", false);
          alert("가입이 완료되었습니다");
        });
    } else {
      fetch("/auth/company/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companySignUpInfo),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          isActiveModal("SignUp", false);
          alert("가입이 완료되었습니다");
        });
    }
  };
  const isActiveModal = (type: string, isActive: boolean) => {
    handleOpenModal(type, isActive);
  };
  const handleUserChecked = (e: React.MouseEvent<HTMLLabelElement>) => {
    document.getElementsByClassName("checked")[0].classList.remove("checked");
    e.currentTarget.classList.add("checked");
    setUserType(e.currentTarget.innerText);
    setPersonSignUpInfo({
      username: "",
      password: "",
      phoneNumber: "",
      name: "",
      email: "",
      gender: "",
      major: "",
      education: "",
      university: "",
    });
    setCompanySignUpInfo({
      companyId: "",
      password: "",
      registNum: 0,
      companyName: "",
    });
  };
  return (
    <Modal isActiveModal={isActiveModal}>
      <ServiceTitle>회원가입</ServiceTitle>
      <LoginContainer
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSignUp(e)}
      >
        <UserContainer>
          <UserLabel
            className="border-right checked"
            onClick={(e: React.MouseEvent<HTMLLabelElement>) =>
              handleUserChecked(e)
            }
          >
            <UserInput
              checked
              name="user"
              type="radio"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPersonSignUpInfo((prev) => {
                  return { ...prev, user: "person" };
                });
              }}
            />
            개인
          </UserLabel>
          <UserLabel
            onClick={(e: React.MouseEvent<HTMLLabelElement>) =>
              handleUserChecked(e)
            }
          >
            <UserInput
              name="user"
              type="radio"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPersonSignUpInfo((prev) => {
                  return { ...prev, user: "company" };
                });
              }}
            />
            기업
          </UserLabel>
        </UserContainer>
        {userType === "개인" ? (
          <>
            <IdInput
              type="text"
              placeholder="이름"
              value={personSignUpInfo.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonSignUpInfo((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
            />
            <IdInput
              type="text"
              placeholder="아이디"
              value={personSignUpInfo.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonSignUpInfo((prev) => {
                  return { ...prev, username: e.target.value };
                })
              }
            />
            <PwInput
              type="password"
              placeholder="비밀번호"
              value={personSignUpInfo.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonSignUpInfo((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />

            <IdInput
              type="number"
              placeholder="전화번호"
              value={personSignUpInfo.phoneNumber}
              maxLength={11}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonSignUpInfo((prev) => {
                  return { ...prev, phoneNumber: e.target.value };
                })
              }
            />
            <IdInput
              type="text"
              placeholder="이메일"
              value={personSignUpInfo.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonSignUpInfo((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />
            <IdInput
              type="text"
              placeholder="학력"
              value={personSignUpInfo.education}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonSignUpInfo((prev) => {
                  return { ...prev, education: e.target.value };
                })
              }
            />
            <IdInput
              type="text"
              placeholder="학교"
              value={personSignUpInfo.university}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonSignUpInfo((prev) => {
                  return { ...prev, university: e.target.value };
                })
              }
            />
            <IdInput
              type="text"
              placeholder="전공"
              value={personSignUpInfo.major}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonSignUpInfo((prev) => {
                  return { ...prev, major: e.target.value };
                })
              }
            />
            <GenderContainer>
              <GenderLabel>
                <GenderInput
                  name="gender"
                  type="radio"
                  onChange={() =>
                    setPersonSignUpInfo((prev) => {
                      return { ...prev, gender: "male" };
                    })
                  }
                />
                남자
              </GenderLabel>
              <GenderLabel>
                <GenderInput
                  name="gender"
                  type="radio"
                  onChange={() =>
                    setPersonSignUpInfo((prev) => {
                      return { ...prev, gender: "female" };
                    })
                  }
                />
                여자
              </GenderLabel>
            </GenderContainer>
          </>
        ) : (
          <>
            <IdInput
              type="text"
              placeholder="회사명"
              value={companySignUpInfo.companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanySignUpInfo((prev) => {
                  return { ...prev, companyName: e.target.value };
                })
              }
            />
            <IdInput
              type="text"
              placeholder="아이디"
              value={companySignUpInfo.companyId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanySignUpInfo((prev) => {
                  return { ...prev, companyId: e.target.value };
                })
              }
            />
            <PwInput
              type="password"
              placeholder="비밀번호"
              value={companySignUpInfo.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanySignUpInfo((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
            <p>사업자등록번호</p>
            <IdInput
              type="number"
              placeholder="사업자등록번호"
              value={companySignUpInfo.registNum}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanySignUpInfo((prev) => {
                  return { ...prev, registNum: Number(e.target.value) };
                })
              }
            />
          </>
        )}
        <SignUpButton type="submit" value="가입" />
        <LoginButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            isActiveModal("SignUp", false);
            isActiveModal("Login", true);
          }}
        >
          이미 회원이신가요? <u>로그인하기</u>
        </LoginButton>
      </LoginContainer>
    </Modal>
  );
}
