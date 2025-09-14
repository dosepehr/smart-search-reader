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
  const [isFocused, setIsFocused] = useState(false);
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
          key={`${i}-${debouncedSearch}`} // force re-animate
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

  const suggestions = useMemo(() => {
    if (search.length < 1) return [];
    const words = Array.from(new Set(text.split(/\W+/))); // unique words
    return words
      .filter((w) => w.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5); // show max 5
  }, [search]);

  const handleSuggestionClick = (word: string) => {
    setSearch(word);
    setIsFocused(false);
  };

  return (
    <div className="font-mono relative">
      <div className="container py-10 max-w-4xl">
        <div className="relative">
          <Input
            icon={<Magnifer />}
            placeholder="Search..."
            isAnimated
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // delay so click registers
          />

          {/* suggestions dropdown */}
          {isFocused && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-md z-50">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

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
