// import { useForm, SubmitHandler } from 'react-hook-form';
// import Link from 'next/link';
// import db from "../../firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { useRouter } from "next/router";
// import { ErrorMessage } from '@hookform/error-message';
// import { useQuery } from "react-query";
// import axios from "axios";

// const indexPath = '../';

// type FormData = {
//     title: string;
//     text: string;
// }

// export default function Create() {
//     const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
//     const router = useRouter();    

//     const onSubmit = (data: FormData) => {
//         const postData = collection(db, "posts");
//         addDoc(postData, { title: data.title, text: data.text })
//         .then(() => {
//             console.log("データ保存できました", data.text);
//             router.push(indexPath);
//         })
//         .catch((err) => {
//             console.log("エラーが発生しました", err);
//         })
//     }

//     return (
//         <>
//             <h1>作成ページ</h1>

//             {/* フォームを作成する。メモの内容を入力するだけ */}
//             <Link href={indexPath}>一覧画面へ戻る</Link>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <div>
//                         <input {...register('title', { required: true })} />
//                         {errors.title && <p>タイトルを入力してください</p>}
//                     </div>
//                     <div>
//                         <input {...register('text', { required: true })} />
//                         {errors.text && <p>メッセージを入力してください</p>}
//                     </div>
//                 </div>
//                 <div>
//                     <input type="submit" />
//                 </div>
//             </form>
//         </>
//     );
// }
