import { useRouter } from 'next/router';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import Link from 'next/link';

import React, { useState } from "react";

// QueryClientのインスタンスを作成
const queryClient = new QueryClient();

// データの型を定義
type Post = {
  id: string;
  title: string;
  content: string;
};

export default function Edit() {
  
  const router = useRouter();
  const { postId } = router.query;
  const api = `http://localhost:18080/v1/note/${postId}`;

  // useQueryフックを使用してデータを取得
  const { data, isLoading, isError } = useQuery<Post>(`${postId}`, () => {
    return axios.get<Post>(api)
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
 
  // データが正常に取得された場合
  return (
    <>
      <Link href={`../../../`}>一覧画面へ戻る</Link>
      <h1>編集ページ</h1>
      <div>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
      </div>
    </>
  );
}
