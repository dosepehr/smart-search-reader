import React, { FC } from "react";
import { MessageProps } from "./message.type";

const Message: FC<MessageProps> = ({ children, classname }) => {
  return (
    <div className="mt-2 text-sm">
      <p className={classname}>{children}</p>
    </div>
  );
};

export default Message;
