import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import {useState,useEffect} from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';//react-hooks-formß
import Link from 'next/link';

const createPath = '/post/create';

const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  return (
    <>
      <Link  href={`${createPath}`}>メモ作成</Link>
    </>
  )
}
