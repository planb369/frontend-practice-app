import Link from "next/link";
import { posts } from "../types/types";
import index from "./index.module.css";
import useFetchIndex from "@/hooks/useFetchIndex";

const createPath = "/post/create";

type ApiResponse = {
  items: posts[];
};

export default function Home() {
  // FeatchDetailコンポーネントを呼び出してデータを取得
  const { posts, isLoading, isError } = useFetchIndex();

  return (
    <>
      <div className={index.container}>
        <h1 className={index.h1}>記事一覧</h1>
        {posts?.map((post) => (
          <div key={post.id} className={index.itemTitle}>
            <Link className={index.title} href={`/post/${post.id}`}>
              {post.title}
            </Link>
          </div>
        ))}
        <div className={index.addBtn}>
          <Link className={index.add} href={`${createPath}`}>
            Add
          </Link>
        </div>
      </div>
    </>
  );
}
