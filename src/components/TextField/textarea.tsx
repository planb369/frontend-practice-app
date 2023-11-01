import React from "react";

type Props = React.ComponentPropsWithoutRef<"textarea">;

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    return <textarea {...props} ref={ref} />;
  }
);
