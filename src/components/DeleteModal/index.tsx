import { Modal } from "../Modal";
import DeleteModalStyle from "./DeleteModalStyle.module.css";
import { useDeletePost } from "@/hooks/useDeletePosts";

//propsをdetailから受け取る
type Props = {
  showFlag: boolean;
  //引数も返り値も持たない関数を表す
  onModalClose: () => void;
};

export const DeleteModal = (props: Props) => {
  //削除機能を読み込み
  const { onDelete } = useDeletePost();

  return (
    //Modalコンポーネントを呼び出し、詳細ページから受け取ったpropsをさらにModalコンポーネントに渡している
    <Modal showFlag={props.showFlag}>
      <p className={DeleteModalStyle.confirmation}>削除しますか？</p>

      <div className={DeleteModalStyle.buttons}>
        <button
          className={DeleteModalStyle.closeButton}
          //詳細ページから受け取ったonModalClose(setShowModal(false))を実行する
          //setShowModal(false)なので閉じる操作しかしない
          onClick={props.onModalClose}
        >
          閉じる
        </button>
        <button className={DeleteModalStyle.deleteButton} onClick={onDelete}>
          削除
        </button>
      </div>
    </Modal>
  );
};
