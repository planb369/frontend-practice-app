import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from "next/router";
import { ErrorMessage } from '@hookform/error-message';
import { useQuery } from "react-query";
import axios from "axios";
import * as yup from "yup";
import { posts } from "../../types"; 
import create from "../../styles/create.module.css";

const indexPath = '../';
const api = 'http://localhost:18080/v1/note';


//バリデーション
const postsSchema = yup.object().shape({
    title: yup
        .string()
        .required("タイトルは必須項目です")
        .max(30, "タイトルは30文字以内で入力してください"),
    content: yup
        .string().required("本文は必須項目です")
        .max(30, "本文は30文字以内で入力してください"),
  });

export default function Create() {
    const { register, handleSubmit, formState: { errors } } = useForm<posts>();
    
    const router = useRouter();    

    const onSubmit = (data: posts) => {

        //バリデーション
        postsSchema.validate(data)
        .then(()=>{//バリデーションが成功した時
            const postData={title: data.title, content: data.content}
            axios.post(api,postData)//ここでデータ投稿処理
            .then(()=>{
                console.log("成功しました");

                //indexへ遷移
                router.push(indexPath);

            }).catch((err)=>{
                console.log('データ送信に失敗しました',err);
            })
        })
        .catch((validationErr)=>{
            console.log("バリデーションエラーです",validationErr);
        })
        

        

        
    }

    return (
        <>
            <div className={create.container}>
                <div className={create.indexBtn}><Link className={create.indexBtnText} href={indexPath}>一覧画面へ戻る</Link></div>
                
                <h1 className={create.h1}>作成ページ</h1>
                
                <form className={create.form} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div>
                            <input className={create.titleErea} placeholder='タイトル' {...register('title', { required: 'タイトルは必須項目です', maxLength: 30 })} />
                            {errors.title && <p>{errors.title.message}</p>}
                        </div>
                        <div>
                            <textarea className={create.contentErea} placeholder='メッセージ' {...register('content', { required: 'メッセージは必須項目です', maxLength: 30 })}  />
                            {errors.content && <p>{errors.content.message}</p>}
                        </div>
                    </div>
                    <div className={create.createButtonContainer}><input className={create.createButton} type="submit" /></div>
                </form>
            </div>
        </>
    );
}
