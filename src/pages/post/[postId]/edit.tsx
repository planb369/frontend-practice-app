import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import React, { useState } from "react";
import useFeatchPostDetail from "@/hooks/useFeatchPostDetail";
import create from "@/pages/post/create/create.module.css";
import { postsScheme } from "@/types/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { Posts } from "@/types/types";
import { baseURL } from "@/baseURL";
import { Button } from "@/components/Button/index";
import { Title } from "@/components/Title/index";
import { Container } from "@/components/Container/index";
import { Input } from "@/components/TextField/input";
import { Textarea } from "@/components/TextField/textarea";

export default function Edit() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postsScheme),
  });

  const router = useRouter();
  const { postId } = router.query;
  const api = `f${baseURL}/${postId}`;

  const { data, isLoading, isError } = useFeatchPostDetail();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); //エラーメッセージ用

  const editPostMutation = async (postData: Omit<Posts, "id">) => {
    const response = await axios.put(api, postData);
    return response.data;
  };

  const {
    mutate,
    isLoading: isMutating,
    isError: isMutatingError,
  } = useMutation("mutationKey", editPostMutation, {
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("ミューテーションエラー:", error);
        // エラーメッセージを設定
        setErrorMessage(error.response?.data?.message || "送信に失敗しました");
      } else {
        console.error("未知のエラー:", error);
        // エラーメッセージを設定
        setErrorMessage("送信に失敗しました");
      }
    },
  });

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    try {
      await mutate(data);
      console.log("成功しました");
      //router.push("/index");
    } catch (err) {
      console.log("データが送信できませんでした", err);
      throw err;
    }
  };

  return (
    <Container>
      <Link className={create.indexBtnText} href={"/index"}>
        <Button color="gray" size="large">
          一覧に戻る
        </Button>
      </Link>

      <Title>編集ページ</Title>

      {errorMessage && <p className={create.error}>{errorMessage}</p>}

      <form className={create.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={create.formGroup}>
            <label htmlFor="title">タイトル:</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
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
                <Textarea
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
          <Button color="green" size="large" type="submit">
            編集
          </Button>
        </div>
      </form>
    </Container>
  );
}
