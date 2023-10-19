import * as yup from "yup";

// バリデーション設定
export const postsSchema = yup.object().shape({
    title: yup
      .string()
      .required("タイトルは必須項目です")
      .max(10, "タイトルは10文字以内で入力してください"),
    content: yup
      .string()
      .required("本文は必須項目です")
      .max(10, "本文は10文字以内で入力してください"),
  });
  