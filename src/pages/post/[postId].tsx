import { useRouter } from 'next/router';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from "react";
import { posts } from "../../types/types"; 
import Modal from "../../components/Modal";
import FeatchDetail from '@/apis/featchDetail';
import details from "../../styles/details.module.css";

// QueryClientのインスタンスを作成
const queryClient = new QueryClient();

export default function Details() {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { postId } = router.query;

  // FeatchDetailコンポーネントを呼び出してデータを取得
  const { data, isLoading, isError } = FeatchDetail();


  
  //ここから削除機能
  const ShowModal = () => {
    setShowModal(true);
  };

 
  const onDelete = () => {
    const api = `http://localhost:18080/v1/note/${postId}`;
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
      <div className={details.container}> 
        <div className={details.indexBtn}>
          <Link className={details.indexBtnText} href={`../`}>一覧画面へ戻る</Link>
        </div>
        
        <h1 className={details.h1}>記事詳細</h1>
        <div>
          <p className={details.title}>{data?.title}</p>
          <p className={details.content}>{data?.content}</p>
        </div>

        
        <div className={details.buttons}>
          <button className={details.deleteButton} onClick={ShowModal}>削除</button>
          {/* Appコンポーネントから子であるModalコンポーネントにpropsを渡す */}
          <Modal showFlag={showModal} setShowModal={setShowModal} onDelete={onDelete} />

          <div className={details.editButton}><Link className={details.edit} href={`${postId}/edit`}>編集</Link></div>
        </div>
        
      </div>
    </>
  );
}
