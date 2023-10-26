import Link from "next/link";
import index from "./index.module.css";
import useFetchIndex from "@/hooks/useFetchIndex";
import { Button } from "@/components/Button/index";

export default function Home() {
  // FeatchDetailコンポーネントを呼び出してデータを取得
  const { posts, isLoading, isError } = useFetchIndex();

  return (
    <>
      <div className={index.container}>
        <h1 className={index.h1}>記事一覧</h1>
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
      </div>
    </>
  );
}
