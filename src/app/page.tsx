"use client";
import { useState } from "react";

import Input from "@/components/Input";
import Magnifer from "%/magnifer.svg";
import { useDebounce } from "@/utils/hooks/useDebounce";

export default function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  console.log("Debounced:", debouncedSearch);

  return (
    <div className="font-mono">
      <div className="container py-10 max-w-4xl">
        <Input
          icon={<Magnifer />}
          placeholder="Search..."
          isAnimated
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <div className="border border-primary p-4 rounded-lg mt-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum maxime
          ea quisquam, pariatur deleniti vel, optio eius perferendis, at
          repellendus odio doloribus saepe eaque ad atque nam ipsam! Aspernatur,
          maiores? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Earum maxime ea quisquam, pariatur deleniti vel, optio eius
          perferendis, at repellendus odio doloribus saepe eaque ad atque nam
          ipsam! Aspernatur, maiores? Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Earum maxime ea quisquam, pariatur deleniti vel,
          optio eius perferendis, at repellendus odio doloribus saepe eaque ad
          atque nam ipsam! Aspernatur, maiores? Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Earum maxime ea quisquam, pariatur
          deleniti vel, optio eius perferendis, at repellendus odio doloribus
          saepe eaque ad atque nam ipsam! Aspernatur, maiores? Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Earum maxime ea quisquam,
          pariatur deleniti vel, optio eius perferendis, at repellendus odio
          doloribus saepe eaque ad atque nam ipsam! Aspernatur, maiores? Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Earum maxime ea
          quisquam, pariatur deleniti vel, optio eius perferendis, at
          repellendus odio doloribus saepe eaque ad atque nam ipsam! Aspernatur,
          maiores? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Earum maxime ea quisquam, pariatur deleniti vel, optio eius
          perferendis, at repellendus odio doloribus saepe eaque ad atque nam
          ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Earum maxime ea quisquam, pariatur deleniti vel,
          optio eius perferendis, at repellendus odio doloribus saepe eaque ad
          atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Earum maxime ea quisquam, pariatur
          deleniti vel, optio eius perferendis, at repellendus odio doloribus
          saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Earum maxime ea quisquam,
          pariatur deleniti vel, optio eius perferendis, at repellendus odio
          doloribus saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Earum maxime ea
          quisquam, pariatur deleniti vel, optio eius perferendis, at
          repellendus odio doloribus saepe eaque ad atque nam ipsam! Aspernatur,
          maiores?Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Earum maxime ea quisquam, pariatur deleniti vel, optio eius
          perferendis, at repellendus odio doloribus saepe eaque ad atque nam
          ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Earum maxime ea quisquam, pariatur deleniti vel,
          optio eius perferendis, at repellendus odio doloribus saepe eaque ad
          atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Earum maxime ea quisquam, pariatur
          deleniti vel, optio eius perferendis, at repellendus odio doloribus
          saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Earum maxime ea quisquam,
          pariatur deleniti vel, optio eius perferendis, at repellendus odio
          doloribus saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Earum maxime ea
          quisquam, pariatur deleniti vel, optio eius perferendis, at
          repellendus odio doloribus saepe eaque ad atque nam ipsam! Aspernatur,
          maiores?Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Earum maxime ea quisquam, pariatur deleniti vel, optio eius
          perferendis, at repellendus odio doloribus saepe eaque ad atque nam
          ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Earum maxime ea quisquam, pariatur deleniti vel,
          optio eius perferendis, at repellendus odio doloribus saepe eaque ad
          atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Earum maxime ea quisquam, pariatur
          deleniti vel, optio eius perferendis, at repellendus odio doloribus
          saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Earum maxime ea quisquam,
          pariatur deleniti vel, optio eius perferendis, at repellendus odio
          doloribus saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Earum maxime ea
          quisquam, pariatur deleniti vel, optio eius perferendis, at
          repellendus odio doloribus saepe eaque ad atque nam ipsam! Aspernatur,
          maiores?Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Earum maxime ea quisquam, pariatur deleniti vel, optio eius
          perferendis, at repellendus odio doloribus saepe eaque ad atque nam
          ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Earum maxime ea quisquam, pariatur deleniti vel,
          optio eius perferendis, at repellendus odio doloribus saepe eaque ad
          atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Earum maxime ea quisquam, pariatur
          deleniti vel, optio eius perferendis, at repellendus odio doloribus
          saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Earum maxime ea quisquam,
          pariatur deleniti vel, optio eius perferendis, at repellendus odio
          doloribus saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Earum maxime ea
          quisquam, pariatur deleniti vel, optio eius perferendis, at
          repellendus odio doloribus saepe eaque ad atque nam ipsam! Aspernatur,
          maiores?Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Earum maxime ea quisquam, pariatur deleniti vel, optio eius
          perferendis, at repellendus odio doloribus saepe eaque ad atque nam
          ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Earum maxime ea quisquam, pariatur deleniti vel,
          optio eius perferendis, at repellendus odio doloribus saepe eaque ad
          atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Earum maxime ea quisquam, pariatur
          deleniti vel, optio eius perferendis, at repellendus odio doloribus
          saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Earum maxime ea quisquam,
          pariatur deleniti vel, optio eius perferendis, at repellendus odio
          doloribus saepe eaque ad atque nam ipsam! Aspernatur, maiores?Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Earum maxime ea
          quisquam, pariatur deleniti vel, optio eius perferendis, at
          repellendus odio doloribus saepe eaque ad atque nam ipsam! Aspernatur,
          maiores?Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Earum maxime ea quisquam, pariatur deleniti vel, optio eius
          perferendis, at repellendus odio doloribus saepe eaque ad atque nam
          ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Earum maxime ea quisquam, pariatur deleniti vel,
          optio eius perferendis, at repellendus odio doloribus saepe eaque ad
          atque nam ipsam! Aspernatur, maiores?Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Earum maxime ea quisquam, pariatur
          deleniti vel, optio eius perferendis, at repellendus odio doloribus
          saepe eaque ad atque nam ipsam! Aspernatur, maiores?
        </div>
      </div>
    </div>
  );
}
