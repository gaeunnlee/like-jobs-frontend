import { styled } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const Wrapper = styled.button`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  z-index: 9999;
`;
const Container = styled.div`
  background-color: #fff;
  width: 500px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 30px;
`;
const CloseButton = styled.button`
  align-self: flex-end;
  justify-self: flex-start;
  font-size: 30px;
`;

type ModalProps = {
    children: React.ReactNode;
    height?: string;
    isActiveModal: (type: string, isActive: boolean) => void
  };

export default function Modal(
  { children, isActiveModal }: ModalProps,
) {
  const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    isActiveModal("Login", false)
    isActiveModal("SignUp", false)
  };
  return (
    <Wrapper
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        handleCloseModal(e);
      }}
    >
      <Container
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <CloseButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleCloseModal(e)
          }
        >
          <AiOutlineClose />
        </CloseButton>
        {children}
      </Container>
    </Wrapper>
  );
}
