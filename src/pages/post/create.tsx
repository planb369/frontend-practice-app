import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from "next/router";
import { ErrorMessage } from '@hookform/error-message';
import { useQuery } from "react-query";
import axios from "axios";

const indexPath = '../';
const api = 'http://localhost:18080/v1/note';


type FormData = {
    id: string;
    title: string;
    content: string;
}

export default function Create() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter();    

    const onSubmit = (data: FormData) => {
        //ここでデータ投稿処理

        const postData={title: data.title, content: data.content}


        axios.post(api,postData)
        .then(()=>{
            console.log("成功しました");
            //indexへ遷移

        }).catch((err)=>{
            console.log('データ送信に失敗しました',err);
        })


        // try{
        //     const newPost={
        //         title: data.title,
        //         content: data.content,
        //     };

        //     //apiへ送信
        //     axios.post(api,{items: [newPost]});

        //     //indexへ遷移
        // }catch(err){
        //     console.log('データの投稿に失敗しました',err);
        // }
    }

    return (
        <>
            <Link href={indexPath}>一覧画面へ戻る</Link>
            <h1>作成ページ</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <input placeholder='タイトル' {...register('title', { required: true })} />
                        {errors.title && <p>タイトルを入力してください</p>}
                    </div>
                    <div>
                        <input placeholder='メッセージ' {...register('content', { required: true })} />
                        {errors.content && <p>メッセージを入力してください</p>}
                    </div>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </>
    );
}
