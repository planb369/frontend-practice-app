import React from "react";
import ModalStyle from "./ModalStyle.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import Modal from "../Modal";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

//modalの型定義
type ModalProps = {
  showFlag: boolean;
  onModalClose: (show: boolean) => void;
  onDelete: () => void;
};

//削除機能
const deletePost = async (postId: string) => {
  const api = `http://localhost:18080/v1/note/${postId}`;
  const res = await axios.delete(api);
  return res.data;
};

//読み込まれる関数
export const useDeletePost = () => {
  const router = useRouter();
  const { postId } = router.query;

  //deletePost関数を呼び出し
  const mutation = useMutation(() => deletePost(postId as string), {
    onSuccess: () => {
      console.log("成功しました");
      router.push("/");
    },
    onError: (err) => {
      console.log("削除に失敗しました");
    },
  });

  const onDelete = () => {
    mutation.mutate();
  };
  return { onDelete };
};
