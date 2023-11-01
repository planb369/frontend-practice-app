import Link from "next/link";
import index from "./index.module.css";
import useFetchIndex from "@/hooks/useFetchIndex";
import { Button } from "@/components/Button/index";
import { Title } from "@/components/Title/index";
import { Container } from "@/components/Container/index";

export default function Home() {
  // FeatchDetailコンポーネントを呼び出してデータを取得
  const { posts, isLoading, isError } = useFetchIndex();

  return (
    <Container>
      <Title>記事一覧</Title>

      {/* データ取得中の表示 */}
      {isLoading && <p>読み込み中...</p>}

      {/* データ取得エラーの表示 */}
      {isError && <p>Error: データの取得に失敗しました。</p>}

      {/* データが存在する場合の表示 */}
      {posts?.map((post) => (
        <div key={post.id} className={index.itemTitle}>
          <Link className={index.title} href={`../post/detail/${post.id}`}>
            {post.title}
          </Link>
        </div>
      ))}

      <div className={index.addBtnContainer}>
        <Link href={"../post/create/create"}>
          <Button color="green" size="large">
            追加
          </Button>
        </Link>
      </div>
    </Container>
  );
}
