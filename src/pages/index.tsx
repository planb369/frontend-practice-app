import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';//react-hooks-formß
import Link from 'next/link';
import { posts } from "../types"; 

const createPath = '/post/create';




// type posts={
//   id:string;
//   title:string;
//   content:string;
// }
type ApiResponse={
  items:posts[];
}

export default function Home() {
  const queryClient=new QueryClient();
  const api = 'http://localhost:18080/v1/note';


  const {data: posts, isLoading,isError}=useQuery<posts[]>(
    'posts',
    async()=>{
      try{
        const response=await axios.get<ApiResponse>(api);
        return response.data.items;
      }catch(err){
        throw new Error('データの取得に失敗しました');
      }
    }
  )


  return (
    <>
      <div>
        <h1>一覧表示</h1>
        {posts?.map((post) => (
          <div key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </div>
        ))}
      </div>
      <Link  href={`${createPath}`}>メモ作成</Link>

    </>
  )
}
