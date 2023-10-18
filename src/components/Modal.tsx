import React from "react";

type ModalProps = {
    showFlag: boolean;
    setShowModal: (show: boolean) => void;
};

const Modal: React.FC<ModalProps> = (props) => {
const closeModal = () => {
    props.setShowModal(false);
    };

  return (
    <>
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div id="overlay" style={overlay}>
            <div id="modalContent" style={modalContent}>
            <p>削除しますか？</p>
            <button onClick={closeModal}>閉じる</button>
            </div>
        </div>
      
      ) : (
        <></>// showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;

const modalContent: React.CSSProperties = {
    background: "white",
    padding: "10px",
    borderRadius: "3px",
};

const overlay: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
