import React from "react";
import deleteModal from "../styles/deleteModal.module.css"

type ModalProps = {
    showFlag: boolean;
    setShowModal: (show: boolean) => void;
    onDelete: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
 
    const closeModal = () => {
        props.setShowModal(false);
    };

    //削除機能
    const onClickDelete = () => {
        // 削除処理を実行
        props.onDelete();
        closeModal(); // モーダルを閉じる
    };

    return (
        <>
        {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
            <div className={deleteModal.overlay}>
                <div className={deleteModal.modalContent}>
                <p>削除しますか？</p>
                <button onClick={closeModal}>閉じる</button>
                <button onClick={onClickDelete}>削除</button>
                </div>
            </div>
        
        ) : (
            <></>// showFlagがfalseの場合はModalは表示しない
        )}
        </>
    );
};

export default Modal;
