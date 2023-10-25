import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import React from "react";
import useFeatchPostDetail from "@/hooks/useFeatchPostDetail";
import create from "../create.module.css";
import common from "../../../components/common.module.css";
import { postsScheme } from "@/types/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { posts } from "@/types/types";

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
  const api = `http://localhost:18080/v1/note/${postId}`;

  // 対象の詳細データを取得
  const { data, isLoading, isError } = useFeatchPostDetail();

  // 編集処理
  const editPostMutation = async (postData: Omit<posts, "id">) => {
    const response = await axios.put(api, postData);
    return response.data; // 編集されたデータを返す
  };

  //useMutationから必要なものを取得
  const {
    mutate,
    isLoading: isMutating,
    isError: isMutatingError,
  } = useMutation(editPostMutation);

  // フォームのonSubmit
  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    try {
      await mutate(data); // 編集を実行
      console.log("成功しました");
      router.push("/");
    } catch (err) {
      console.log("データが送信できませんでした", err);
    }
  };

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
                  defaultValue={data && data.title}
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
                  defaultValue={data && data.content}
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
