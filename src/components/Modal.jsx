import React, { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 250px;
  max-width: 600px;
  min-hight: 170px;
  background: white;
  color: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  padding: 1rem;
`;

const ModalHeader = styled.h3`
  height: 50px;
  background: white;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const ModalContent = styled.div`
  padding: 10px;
  font-size: 14px;
  color: #2c3e50;
  text-align: center;
`;

export default function Modal({ children, title, isOpen, setIsOpen, onClose }) {
  const modalRef = useRef();

  const closeModal = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const elemContains = (rect, x, y) => {
    return rect
      ? rect.x <= x &&
          x <= rect.x + rect.width &&
          rect.y <= y &&
          y <= rect.y + rect.height
      : false;
  };

  const handleClickOutside = (e) => {
    let rect = modalRef?.current?.getBoundingClientRect();
    if (!elemContains(rect, e.clientX, e.clientY)) {
      closeModal();
    }
  };

  return isOpen ? (
    <Container onMouseDown={handleClickOutside}>
      <Content ref={modalRef}>
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>{children}</ModalContent>
      </Content>
    </Container>
  ) : null;
}
