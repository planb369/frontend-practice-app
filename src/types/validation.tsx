import * as yup from "yup";

// バリデーション設定
export const postsSchema = yup.object().shape({
  title: yup
    .string()
    .required("タイトルは必須項目です")
    .max(120, "タイトルは120文字以内で入力してください"),
  content: yup
    .string()
    .required("本文は必須項目です")
    .max(100000, "本文は100000文字以内で入力してください"),
});
