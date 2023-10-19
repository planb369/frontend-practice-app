import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import * as yup from "yup";
import { posts } from "../../types/types";
import create from "../../styles/create.module.css";
import React, { useState } from "react";
import { postsSchema } from "@/types/validation";

const indexPath = "../";
const api = "http://localhost:18080/v1/note";

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<posts>();
  const router = useRouter();
  const [titleValidationErrors, setTitleValidationErrors] = useState("");
  const [contentValidationErrors, setContentValidationErrors] = useState("");

  const onSubmit: SubmitHandler<posts> = async (data) => {
    try {
      // バリデーションチェック
      await postsSchema.validate(data);

      // バリデーションエラーがない場合、エラーメッセージをクリア
      setTitleValidationErrors("");
      setContentValidationErrors("");

      const postData = { title: data.title, content: data.content };
      await axios.post(api, postData);
      console.log("成功しました");
      router.push(indexPath);
    } catch (validationErr) {
      if (validationErr instanceof yup.ValidationError) {
        const errorMessages = validationErr.errors.join(", ");

        // エラーメッセージを設定
        if (validationErr.path === "title") {
          setTitleValidationErrors(errorMessages);
        }
        if (validationErr.path === "content") {
          setContentValidationErrors(errorMessages);
        }
      } else {
        console.log("その他のエラー", validationErr);
      }
    }
  };

  return (
    <>
      <div className={create.container}>
        <div className={create.indexBtn}>
          <Link className={create.indexBtnText} href={indexPath}>
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
              {/* バリデーションエラーメッセージを表示 */}
              {titleValidationErrors && (
                <p className={create.validationMessage}>
                  {titleValidationErrors}
                </p>
              )}
            </div>
            <div>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <textarea
                    className={create.contentErea}
                    placeholder="メッセージ"
                    {...field}
                  />
                )}
              />
              {/* バリデーションエラーメッセージを表示 */}
              {contentValidationErrors && (
                <p className={create.validationMessage}>
                  {contentValidationErrors}
                </p>
              )}
            </div>
          </div>
          <div className={create.createButtonContainer}>
            <input className={create.createButton} type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}
