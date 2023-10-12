import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import db from "../firebase";
// import {collection, getDocs,deleteDoc, doc} from "firebase/firestore";

import {useState,useEffect} from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';//react-hooks-formß
import Link from 'next/link';

const createPath = '/post/create';




type datas={
  id:string;
  title:string;
  content:string;
}

export default function Home() {
  const [datas,setDatas]=useState<datas[]>([]);
  const api = 'http://localhost:18080/v1/note';

  useEffect(()=>{
    axios.get(api)
    .then((res)=>{
      console.log(res.data.items);
      setDatas(res.data.items);
    })
    .catch((err)=>{
      console.log("エラーが発生しました",err);
    })
  })


  return (
    <>
      <div>
        {/* メモ一覧表示 */}
        {datas.map((data)=>(
          <div key={data.id}>
            <p>
              {data.title}
            </p>
          </div>
        ))}
      </div>
      <Link  href={`${createPath}`}>メモ作成</Link>

    </>
  )
}
