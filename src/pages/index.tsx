import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import db from "../firebase";
import {collection, getDocs,deleteDoc, doc} from "firebase/firestore";

import {useState,useEffect} from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';//react-hooks-formß
import Link from 'next/link';

const createPath = '/post/create';

const url = 'http://frontend-practice-app.firebaseio.com/fruits.json';


type posts={
  id:string;
  text:string;
}

const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  const [posts,setPosts]=useState<posts[]>([]);

  const fetchPosts=()=>{
    const postData=collection(db,"posts");
    getDocs(postData)
    .then((res)=>{
      const fetchPosts: posts[]=res.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      })as posts);
      setPosts(fetchPosts);
    })
  }

  useEffect(()=>{
    fetchPosts();
  },[]);

  return (
    <>
      <div>
        {/* メモ一覧表示 */}
        {posts.map((post)=>(
          <div key={post.id}>
            <p>
              {post.text}
            </p>
          </div>
        ))}
      </div>
      <Link  href={`${createPath}`}>メモ作成</Link>

    </>
  )
}
