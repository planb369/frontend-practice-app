import { useRouter } from 'next/router';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import Link from 'next/link';

import React, { useState } from "react";
import Modal from "../../components/Modal";

// QueryClientのインスタンスを作成
const queryClient = new QueryClient();

// データの型を定義
type Post = {
  id: string;
  title: string;
  content: string;
};

export default function Details() {
  const [showModal, setShowModal] = useState(false);
  
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




  

  const ShowModal = () => {
    setShowModal(true);
  };

  //削除機能
  const onDelete = () => {
  
    axios.delete(api)
      .then(() => {
        console.log("成功しました");
        // indexへ遷移
        router.push('../../')
      })
      .catch((err) => {
        console.log('データ送信に失敗しました', err);
      });
  };

  // データが正常に取得された場合
  return (
    <>
      <Link href={`../`}>一覧画面へ戻る</Link>
      <h1>データ表示</h1>
      <div>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
      </div>

      {/* <div>
        <button onClick={onClickDelete}>削除</button>
      </div> */}

      <button onClick={ShowModal}>削除</button>
      {/* Appコンポーネントから子であるModalコンポーネントにpropsを渡す */}
      
      <Modal showFlag={showModal} setShowModal={setShowModal} onDelete={onDelete} />








    </>
  );
}
