import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import { DeleteModal } from "@/components/DeleteModal";
import useFeatchPostDetail from "@/hooks/useFeatchPostDetail";
import details from "./details.module.css";
import common from "@/components/common.module.css";
import { Button } from "@/components/Button/index";

export default function Details() {
  //modalの表示非表示を管理するstate
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { postId } = router.query;

  // FeatchDetailコンポーネントを呼び出してデータを取得
  const { data, isLoading, isError } = useFeatchPostDetail();

  //削除ボタンが押されたらmodalをの表示をtrueにする
  const ShowModal = () => {
    setShowModal(true);
  };

  // データが正常に取得された場合
  return (
    <>
      <div className={common.container}>
        <div className={details.indexBtn}>
          <Link className={details.indexBtnText} href={"/index"}>
            <Button color="gray" size="large">
              一覧画面へ戻る
            </Button>
          </Link>
        </div>

        <h1 className={common.h1}>記事詳細</h1>
        <div>
          <p className={details.title}>{data?.title}</p>
          <p className={details.content}>{data?.content}</p>
        </div>

        <div className={details.buttons}>
          <button className={details.deleteButton} onClick={ShowModal}>
            削除
          </button>
          {/* 子コンポーネントのDeleteModalを呼び出す */}
          <DeleteModal
            showFlag={showModal}
            onModalClose={() => setShowModal(false)} //閉じる操作しかさせない
          />

          <div className={details.editButton}>
            <Link className={details.edit} href={`../${postId}/edit`}>
              編集
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
