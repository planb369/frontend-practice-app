import { useRouter } from 'next/router';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { posts } from "../../../types"; 
import React, { useState } from "react";

// QueryClientのインスタンスを作成
const queryClient = new QueryClient();

export default function Edit() {

    const { register, handleSubmit, formState: { errors } } = useForm<posts>();
  
  const router = useRouter();
  const { postId } = router.query;
  const api = `http://localhost:18080/v1/note/${postId}`;

  // useQueryフックを使用してデータを取得
  const { data, isLoading, isError } = useQuery<posts>(`${postId}`, () => {
    return axios.get<posts>(api)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // データの取得に失敗した場合のエラーハンドリング
        throw new Error('データを取得できませんでした');
      });
  });

  // ローディング中の場合
  if (!data) return <p>Loading...</p>;

  //ここまでデータの取得



  //ここからデータ送信して編集
  const onSubmit = (data: posts) => {
    //ここでデータ投稿処理

    const postData={title: data.title, content: data.content}

    axios.put(api,postData)
    .then(()=>{
        console.log("成功しました");

        //indexへ遷移
        router.push("../../../");

    }).catch((err)=>{
        console.log('データ送信に失敗しました',err);
    })
}

 
  // データが正常に取得された場合
  return (
    <>
        <Link href={`../../../`}>一覧画面へ戻る</Link>
        <h1>編集ページ</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <input placeholder={data.title} {...register('title', { required: true })} />
                    {errors.title && <p>タイトルを入力してください</p>}
                </div>
                <div>
                    <textarea placeholder={data.content} {...register('content', { required: true })} />
                    {errors.content && <p>メッセージを入力してください</p>}
                </div>
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
    </>
  );
}
