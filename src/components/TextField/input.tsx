import React from "react";

//inputのpropsの型を受け取る
type Props = React.ComponentPropsWithoutRef<"input">;

//refとしてinput要素への参照を受け取る
export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input type="text" {...props} ref={ref} />;
});
