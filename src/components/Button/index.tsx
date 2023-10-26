import styles from "./Button.module.css";

type Props = {
  children?: React.ReactNode;
  onClick?: () => void; //onClickが設定されていれば実行できるようにする
  color?: "red" | "gray" | "blue" | "green";
};

export const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      // colorが設定されていなければデフォルトでgray
      data-color={props.color ?? "gray"}
      className={styles.base}
    >
      {props.children}
    </button>
  );
};
