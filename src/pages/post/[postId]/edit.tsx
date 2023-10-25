import { baseURL } from "@/components/baseURL";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import React, { useState } from "react";
import useFeatchPostDetail from "@/hooks/useFeatchPostDetail";
import create from "../create.module.css";
import common from "../../../components/common.module.css";
import { postsScheme } from "@/types/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { posts } from "@/types/types";

const api = baseURL;

//編集機能
const editPost = async (postData: Omit<posts, "id">) => {
  const res = await axios.post(api, postData);
  return res.data;
};

export default function Edit() {
  //useFromから必要なものを取得
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postsScheme),
  });
  const router = useRouter();
  const { postId } = router.query;

  // 対象の詳細データを取得
  const { data, isLoading, isError } = useFeatchPostDetail();
  // ローディング中の場合
  if (!data) return <p>Loading...</p>;

  //useMutationからeditPostを実行
  const mutation = useMutation(editPost, {
    onSuccess: () => {
      console.log("成功しました");
      router.push("/");
    },
    onError: (err) => {
      console.log("投稿に失敗しました", err);
    },
  });

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    try {
      const postData = { title: data.title, content: data.content };
      mutation.mutate(postData);
    } catch (err) {
      console.log("データが編集できませんでした", err);
    }
  };

  // データが正常に取得された場合
  return (
    <div className={common.container}>
      <div className={create.indexBtn}>
        <Link className={create.indexBtnText} href={"/"}>
          一覧画面へ戻る
        </Link>
      </div>

      <h1 className={create.h1}>編集ページ</h1>
      <form className={create.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={create.formGroup}>
            <label htmlFor="title">タイトル:</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  defaultValue={data.title}
                  className={create.titleErea}
                  type="text"
                  {...field}
                />
              )}
            />
            <p className={create.error}>{errors.title?.message}</p>
          </div>
          <div className={create.formGroup}>
            <label htmlFor="content">メッセージ:</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  defaultValue={data.content}
                  className={create.contentErea}
                  {...field}
                />
              )}
            />
            <p className={create.error}>{errors.content?.message}</p>
          </div>
        </div>
        <div className={create.createButtonContainer}>
          <button className={create.createButton} type="submit">
            編集
          </button>
        </div>
      </form>
    </div>
  );
}
