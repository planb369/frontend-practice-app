import { baseURL } from "@/baseURL";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Posts } from "../../../types/types";
import create from "./create.module.css";
import { useMutation } from "react-query";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { postsScheme } from "@/types/validation";
import { Button } from "@/components/Button/index";
import { Title } from "@/components/Title/index";
import { Container } from "@/components/Container/index";
import { Input } from "@/components/TextField/input";
import { Textarea } from "@/components/TextField/textarea";

const api = baseURL;

//投稿機能
const createPost = async (postData: Omit<Posts, "id">) => {
  const res = await axios.post(api, postData);
  return res.data;
};

export default function Create() {
  //control, handleSubmit, formState の分割代入してフォーム制御に必要なものを取得
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //オプションとしてresolver プロパティを指定して、バリデーションを設定
    resolver: yupResolver(postsScheme),
  });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //useMutationは第一引数に実行する処理、第二引数に成功時、失敗時の処理を書く
  const mutation = useMutation(createPost, {
    onSuccess: () => {
      console.log("成功しました");
      router.push("/index");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        console.error("ミューテーションエラー:", err);
        // エラーメッセージを設定
        setErrorMessage(err.response?.data?.message || "送信に失敗しました");
      } else {
        console.error("未知のエラー:", err);
        // エラーメッセージを設定
        setErrorMessage("送信に失敗しました");
      }
    },
  });

  //formの投稿ボタンを押したときに実行されるonSubmit
  //SubmitHandlerはReact Hook Formで使用される型
  //titleとcontentオブジェクトを受け取る
  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    //入力されたdataを引数に取る
    data
  ) => {
    const postData = { title: data.title, content: data.content };

    //reactQueryのuseMutationフックで定義されたミューテーション関数を実行するためのもの
    //mutation処理が入った変数を実行している。
    mutation.mutate(postData);
  };

  return (
    <Container>
      <Link className={create.indexBtnText} href={"/index"}>
        <Button color="gray" size="large">
          一覧に戻る
        </Button>
      </Link>

      <Title>作成ページ</Title>

      {errorMessage && <p className={create.error}>{errorMessage}</p>}

      <form className={create.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={create.formGroup}>
            <label htmlFor="title">タイトル:</label>

            {/* reactHookFromと連携させるためにControllerコンポーネントを使用する */}
            <Controller
              name="title" //deta.titleになる部分
              control={control} //これでnameの追跡ができるようになるらしい
              // render={({ field })で変更がReact Hook Formによって追跡され制御できるらしい
              render={({ field }) => (
                <Input className={create.titleErea} type="text" {...field} />
              )}
            />
            {/* useFromから取得したerrorsオブジェクト */}
            <p className={create.error}>{errors.title?.message}</p>
          </div>
          <div className={create.formGroup}>
            <label htmlFor="content">メッセージ:</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Textarea className={create.contentErea} {...field} />
              )}
            />
            <p className={create.error}>{errors.content?.message}</p>
          </div>
        </div>
        <div className={create.createButtonContainer}>
          <Button color="green" size="large" type="submit">
            投稿
          </Button>
        </div>
      </form>
    </Container>
  );
}
