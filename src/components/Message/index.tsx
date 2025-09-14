import React from "react";

const Message = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <div className="mt-2 text-sm">
      <p className={classname}>{children}</p>
    </div>
  );
};

export default Message;
