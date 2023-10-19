import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import * as yup from "yup";
import { posts } from "../../types/types";
import create from "../../styles/create.module.css";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const errorScheme = yup.object().shape({
  title: yup.string().required("タイトルは必須項目です"),
  content: yup.string().required("メッセージは必須項目です"),
});

const api = "http://localhost:18080/v1/note";

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(errorScheme),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    try {
      // バリデーションチェック
      const postData = { title: data.title, content: data.content };
      await axios.post(api, postData);
      console.log("成功しました");
      router.push("/");
    } catch (validationErr) {
      console.log("その他のエラー", validationErr);
    }
  };

  return (
    <>
      <div className={create.container}>
        <div className={create.indexBtn}>
          <Link className={create.indexBtnText} href={"/"}>
            一覧画面へ戻る
          </Link>
        </div>

        <h1 className={create.h1}>作成ページ</h1>

        <form className={create.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    className={create.titleErea}
                    placeholder="タイトル"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={create.contentErea}
                    placeholder="メッセージ"
                  />
                )}
              />
            </div>
          </div>
          <div className={create.createButtonContainer}>
            <input
              className={create.createButton}
              type="submit"
              value="送信"
              disabled={false} // ボタンの状態をカスタマイズする場合に設定
            />
          </div>
        </form>
      </div>
    </>
  );
}
