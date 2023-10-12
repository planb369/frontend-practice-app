import {useState,useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useRouter} from "next/router";




type details={
  id:string;
  title:string;
  content:string;
}

export default function Details() {
  const router=useRouter();
  const {postId}=router.query;
  const [details,setDetails]=useState<details[]>([]);
  const api = `http://localhost:18080/v1/note/${postId}`;

  useEffect(()=>{
    axios.get(api)
    .then((res)=>{
      console.log(res);
      // console.log(api);
      // setDetails(res.data.items);
    })
    .catch((err)=>{
      console.log("エラーが発生しました",err);
    })
  },[postId])


  return (
    <>
      <h1>データ表示</h1>
      <div>
        {/* {details.title}
        {details.content} */}
      </div>
    </>
  )
}
