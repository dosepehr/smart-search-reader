import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="mt-10" >
      <Image
        src={"/images/logo.png"}
        alt="Smart Search Reader"
        width={1000}
        height={1000}
        className="size-30 mx-auto rounded-full"
      />
      <h1 className="flex gap-x-1 items-center justify-center mt-10 text-xl font-semibold">
        <span className="text-primary">Smart</span>
        <span className="text-secondary">Search</span>
        <span className="text-neutral">Reader</span>
      </h1>
    </div>
  );
};

export default Header;
