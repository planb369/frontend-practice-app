import React from "react";
import ModalStyle from "./ModalStyle.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Modal from "./Modal";

//modalの型定義
type ModalProps = {
  showFlag: boolean;
  onModalClose: (show: boolean) => void;
  onDelete: () => void;
};

export const useDeletePost = () => {
  const router = useRouter();
  const { postId } = router.query;

  const onDelete = () => {
    const api = `http://localhost:18080/v1/note/${postId}`;
    axios
      .delete(api)
      .then(() => {
        console.log("成功しました");
        // indexへ遷移
        router.push("../../");
      })
      .catch((err) => {
        console.log("データ送信に失敗しました", err);
      });
  };
  return { onDelete };
};
