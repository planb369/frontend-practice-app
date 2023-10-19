import React from "react";
import deleteModal from "./deleteModal.module.css";

//modalの型定義
type ModalProps = {
  showFlag: boolean;
  onModalClose: (show: boolean) => void;
  onDelete: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  //モーダルを閉じるボタン
  const closeModal = () => {
    props.onModalClose(false);
  };

  //削除機能
  const onClickDelete = () => {
    // editページの削除処理を実行
    props.onDelete();
    closeModal(); // モーダルを閉じる
  };

  return (
    <>
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div className={deleteModal.overlay}>
          <div className={deleteModal.modalContent}>
            <p className={deleteModal.confirmation}>削除しますか？</p>

            <div className={deleteModal.buttons}>
              <button className={deleteModal.closeButton} onClick={closeModal}>
                閉じる
              </button>
              <button
                className={deleteModal.deleteButton}
                onClick={onClickDelete}
              >
                削除
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;
