import { Modal } from "../Modal";
import DeleteModalStyle from "./DeleteModalStyle.module.css";
import { useDeletePost } from "@/hooks/useDeletePosts";

type Props = {
  showFlag: boolean;
  onModalClose: () => void;
};

export const DeleteModal = (props: Props) => {
  const { onDelete } = useDeletePost();

  return (
    <Modal showFlag={props.showFlag}>
      <p className={DeleteModalStyle.confirmation}>削除しますか？</p>

      <div className={DeleteModalStyle.buttons}>
        <button
          className={DeleteModalStyle.closeButton}
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
