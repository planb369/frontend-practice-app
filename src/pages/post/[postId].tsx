import { useRouter } from 'next/router';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

// QueryClientのインスタンスを作成
const queryClient = new QueryClient();

// データの型を定義
type Post = {
  id: string;
  title: string;
  content: string;
};

export default function Details() {
  const router = useRouter();
  const { postId } = router.query;
  const api = `http://localhost:18080/v1/note/${postId}`;

  // useQueryフックを使用してデータを取得
  const { data, isLoading, isError } = useQuery<Post>(`${postId}`, () => {
    return axios.get<Post>(api)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // データの取得に失敗した場合のエラーハンドリング
        throw new Error('データを取得できませんでした');
      });
  });

  // ローディング中の場合
  if (!data) return <p>Loading...</p>;

  // データが正常に取得された場合
  return (
    <>
      <h1>データ表示</h1>
      <div>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
      </div>
    </>
  );
}
