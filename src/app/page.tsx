"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Input from "@/components/Input";
import Magnifer from "%/magnifer.svg";
import { useDebounce } from "@/utils/hooks/useDebounce";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(search, 500);

  // update url whenever debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedSearch) {
      params.set("q", debouncedSearch);
    } else {
      params.delete("q");
    }

    router.replace(`?${params.toString()}`);
  }, [debouncedSearch, router]);

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
        </div>
      </div>
    </div>
  );
}
