import { useRouter } from 'next/router';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { posts } from "../../../types"; 
import React, { useState } from "react";
import FeatchDetail from '@/apis/featchDetail';
import create from "../../../styles/create.module.css"
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";



// バリデーション設定
const postsSchema = yup.object().shape({
    title: yup
      .string()
      .required("タイトルは必須項目です")
      .max(10, "タイトルは10文字以内で入力してください"),
    content: yup
      .string()
      .required("本文は必須項目です")
      .max(10, "本文は10文字以内で入力してください"),
  });



// QueryClientのインスタンスを作成
const queryClient = new QueryClient();

export default function Edit() {

    const { control, register, handleSubmit, formState: { errors } } = useForm<posts>();
  const router = useRouter();
  const { postId } = router.query;
  const [titleValidationErrors, setTitleValidationErrors] = useState('');
  const [contentValidationErrors, setContentValidationErrors] = useState('');
  const api = `http://localhost:18080/v1/note/${postId}`;

  
  // FeatchDetailコンポーネントを呼び出してデータを取得
  const { data, isLoading, isError } = FeatchDetail();
  // ローディング中の場合
  if (!data) return <p>Loading...</p>;




  const onSubmit: SubmitHandler<posts> = async (data) => {
    try {
      // バリデーションチェック
      await postsSchema.validate(data);

      // バリデーションエラーがない場合、エラーメッセージをクリア
      setTitleValidationErrors('');
      setContentValidationErrors('');

      const postData = { title: data.title, content: data.content };
      await axios.put(api, postData);
      console.log("成功しました");
      router.push('../../../');

    } catch (validationErr) {
      if (validationErr instanceof yup.ValidationError) {
        const errorMessages = validationErr.errors.join(', ');

        // エラーメッセージを設定
        if (validationErr.path === 'title') {
          setTitleValidationErrors(errorMessages);
        } 
        if (validationErr.path === 'content') {
          setContentValidationErrors(errorMessages);
        }
      } else {
        console.log("その他のエラー", validationErr);
      }
    }
  };
 
  // データが正常に取得された場合
  return (
    <>
        <div className={create.container}>
        <div className={create.indexBtn}><Link className={create.indexBtnText} href={`../../../`}>一覧画面へ戻る</Link></div>
            
            <h1 className={create.h1}>編集ページ</h1>

            <form className={create.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <input className={create.titleErea} placeholder={data.title} {...register('title', { required: true })} />
                        {errors.title && <p>タイトルを入力してください</p>}
                    </div>
                    <div>
                        <textarea className={create.contentErea} placeholder={data.content} {...register('content', { required: true })} />
                        {errors.content && <p>メッセージを入力してください</p>}
                    </div>
                </div>
                <div className={create.createButtonContainer}><input className={create.createButton} type="submit" /></div>
            </form>
        </div>
        
    </>
  );
}
