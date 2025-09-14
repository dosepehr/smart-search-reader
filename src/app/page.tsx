"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Input from "@/components/Input";
import Magnifer from "%/magnifer.svg";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { text } from "@/utils/constants";
import { escapeRegex } from "@/utils/funcs/regex";
import Message from "@/components/Message";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(search, 500);

  // update url whenever debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedSearch.length >= 3) {
      params.set("q", debouncedSearch);
    } else {
      params.delete("q");
    }

    router.replace(`?${params.toString()}`);
  }, [debouncedSearch, router]);

  const highlightText = (content: string, query: string) => {
    if (!query || query.length < 3) return content;

    const safeQuery = escapeRegex(query);
    const regex = new RegExp(`(${safeQuery})`, "gi");
    const parts = content.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="highlight-anim bg-secondary text-secondary-content px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // calculate match count
  const matchCount = useMemo(() => {
    if (!debouncedSearch || debouncedSearch.length < 3) return 0;

    const safeQuery = escapeRegex(debouncedSearch);
    const regex = new RegExp(safeQuery, "gi");
    return (text.match(regex) || []).length;
  }, [debouncedSearch]);

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
        {debouncedSearch.length > 0 && (
          <>
            {debouncedSearch.length < 3 ? (
              <Message classname="text-info">
                Type at least 3 characters to start searching
              </Message>
            ) : matchCount > 0 ? (
              <Message classname="text-success">Results : {matchCount}</Message>
            ) : (
              <Message classname="text-error">No results found</Message>
            )}
          </>
        )}

        <div className="border border-primary p-4 rounded-lg mt-6 leading-relaxed">
          {highlightText(text, debouncedSearch)}
        </div>
      </div>
    </div>
  );
}
