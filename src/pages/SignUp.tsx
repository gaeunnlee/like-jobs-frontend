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
  id: string;
  password: string;
  user: string;
  phoneNumber: string;
  name: string;
  email: string;
  gender: string;
}
interface CompanySignUpProps {
  user: string;
  id: string;
  password: string;
  companyNumber: string;
  companyName: string;
}
export default function SignUp({
  handleOpenModal,
}: {
  handleOpenModal(type: string, isActive: boolean): void;
}) {
  const [userType, setUserType] = useState("개인");
  const [personSignUpInfo, setPersonSignUpInfo] = useState<PersonSignUpProps>({
    user: "person",
    id: "",
    password: "",
    phoneNumber: "",
    name: "",
    email: "",
    gender: "",
  });
  const [companySignUpInfo, setCompanySignUpInfo] =
    useState<CompanySignUpProps>({
      user: "company",
      id: "",
      password: "",
      companyNumber: "",
      companyName: "",
    });
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(personSignUpInfo);
    console.log(companySignUpInfo);
    isActiveModal("SignUp",false);
    alert("가입이 완료되었습니다")
  };
  const isActiveModal = (type: string, isActive: boolean) => {
    handleOpenModal(type, isActive);
  };
  const handleUserChecked = (e: React.MouseEvent<HTMLLabelElement>) => {
    document.getElementsByClassName("checked")[0].classList.remove("checked");
    e.currentTarget.classList.add("checked");
    setUserType(e.currentTarget.innerText);
    setPersonSignUpInfo({
      user: "person",
      id: "",
      password: "",
      phoneNumber: "",
      name: "",
      email: "",
      gender: "",
    });
    setCompanySignUpInfo({
      user: "company",
      id: "",
      password: "",
      companyNumber: "",
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
              value={personSignUpInfo.id}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonSignUpInfo((prev) => {
                  return { ...prev, id: e.target.value };
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
              value={companySignUpInfo.id}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanySignUpInfo((prev) => {
                  return { ...prev, id: e.target.value };
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
            <IdInput
              type="number"
              placeholder="사업자등록번호"
              value={companySignUpInfo.companyNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanySignUpInfo((prev) => {
                  return { ...prev, companyNumber: e.target.value };
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
