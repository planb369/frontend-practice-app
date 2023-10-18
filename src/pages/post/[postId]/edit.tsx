import { useRouter } from 'next/router';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { posts } from "../../../types"; 
import React, { useState } from "react";
import FeatchDetail from '@/apis/featchDetail';
import create from "../../../styles/create.module.css"

// QueryClientのインスタンスを作成
const queryClient = new QueryClient();

export default function Edit() {

    const { register, handleSubmit, formState: { errors } } = useForm<posts>();
  
  const router = useRouter();
  const { postId } = router.query;
  const api = `http://localhost:18080/v1/note/${postId}`;

  
  // FeatchDetailコンポーネントを呼び出してデータを取得
  const { data, isLoading, isError } = FeatchDetail();
  // ローディング中の場合
  if (!data) return <p>Loading...</p>;




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
