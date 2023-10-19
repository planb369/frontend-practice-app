import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from "next/router";
import { ErrorMessage } from '@hookform/error-message';
import { useQuery } from "react-query";
import axios from "axios";
import * as yup from "yup";
import { posts } from "../../types";
import create from "../../styles/create.module.css";

const indexPath = '../';
const api = 'http://localhost:18080/v1/note';

const postsSchema = yup.object().shape({
  title: yup
    .string()
    .required("タイトルは必須項目です")
    .max(30, "タイトルは30文字以内で入力してください"),
  content: yup
    .string()
    .required("本文は必須項目です")
    .max(10, "本文は10文字以内で入力してください"),
});

export default function Create() {
  const { control, handleSubmit, formState: { errors } } = useForm<posts>();
  const router = useRouter();

  const onSubmit: SubmitHandler<posts> = (data) => {
    postsSchema.validate(data)
      .then(() => {
        const postData = { title: data.title, content: data.content };
        return axios.post(api, postData);
      })
      .then(() => {
        console.log("成功しました");
        router.push(indexPath);
      })
      .catch((validationErr) => {
        console.log("バリデーションエラーです", validationErr);
      })
      .catch((err) => {
        console.log('データ送信に失敗しました', err);
      });
  };

  return (
    <>
      <div className={create.container}>
        <div className={create.indexBtn}><Link className={create.indexBtnText} href={indexPath}>一覧画面へ戻る</Link></div>

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
              {errors.title && <p>{errors.title.message}</p>}
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
              {errors.content && <p>{errors.content.message}</p>}
            </div>
          </div>
          <div className={create.createButtonContainer}><input className={create.createButton} type="submit" /></div>
        </form>
      </div>
    </>
  );
}
