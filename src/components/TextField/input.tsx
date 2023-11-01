import React from "react";

type Props = React.ComponentPropsWithoutRef<"input">;

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input type="text" {...props} ref={ref} />;
});
