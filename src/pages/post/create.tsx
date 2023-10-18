import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from "next/router";
import { ErrorMessage } from '@hookform/error-message';
import { useQuery } from "react-query";
import axios from "axios";
import * as yup from "yup";

const indexPath = '../';
const api = 'http://localhost:18080/v1/note';


type posts = {
    id: string;
    title: string;
    content: string;
}

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
            <Link href={indexPath}>一覧画面へ戻る</Link>
            <h1>作成ページ</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <input placeholder='タイトル' {...register('title', { required: 'タイトルは必須項目です', maxLength: 30 })} />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div>
                        <input placeholder='メッセージ' {...register('content', { required: 'メッセージは必須項目です', maxLength: 30 })} />
                        {errors.content && <p>{errors.content.message}</p>}
                    </div>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>

        </>
    );
}
