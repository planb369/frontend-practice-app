//Modalの表示と閉じる処理をする

import React from "react";
import ModalStyle from "./ModalStyle.module.css";

//modalの型定義
type ModalProps = {
  children?: React.ReactNode;
  showFlag: boolean;
};

export const Modal: React.FC<ModalProps> = (props) => {
  //もしもDeleteModalから来たshowFlagがfalseならモーダルを表示しない
  if (!props.showFlag) return null;

  return (
    <div className={ModalStyle.overlay}>
      <div className={ModalStyle.modalContent}>{props.children}</div>
    </div>
  );
};
