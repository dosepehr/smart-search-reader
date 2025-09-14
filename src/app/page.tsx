"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Input from "@/components/Input";
import Magnifer from "%/magnifer.svg";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { text } from "@/utils/constants";
import { escapeRegex } from "@/utils/funcs/regex";
import Message from "@/components/Message";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // suggestions
  const [activeMatchIndex, setActiveMatchIndex] = useState(-1); // search results
  const debouncedSearch = useDebounce(search, 500);

  // update URL whenever debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedSearch.length >= 3) {
      params.set("q", debouncedSearch);
    } else {
      params.delete("q");
    }

    router.replace(`?${params.toString()}`);
    setActiveMatchIndex(-1); // reset when search changes
  }, [debouncedSearch, router]);
  // get matches for results navigation
  const matches = useMemo(() => {
    if (!debouncedSearch || debouncedSearch.length < 3) return [];
    const safeQuery = escapeRegex(debouncedSearch);
    const regex = new RegExp(safeQuery, "gi");
    return [...text.matchAll(regex)].map((m) => m[0]);
  }, [debouncedSearch]);
  useEffect(() => {
    const handleDocumentKeyDown = (e: KeyboardEvent) => {
      // Navigate search results only if a search is active and matches exist
      if (matches.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveMatchIndex((prev) =>
            prev < matches.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveMatchIndex((prev) =>
            prev > 0 ? prev - 1 : matches.length - 1
          );
        }
      }
    };

    window.addEventListener("keydown", handleDocumentKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [matches, setActiveMatchIndex]);

  const highlightText = (content: string, query: string) => {
    if (!query || query.length < 3) return content;

    const safeQuery = escapeRegex(query);
    const regex = new RegExp(`(${safeQuery})`, "gi");
    const parts = content.split(regex);

    let matchCounter = -1;

    return parts.map((part, i) => {
      if (regex.test(part)) {
        matchCounter++;
        const isActive = matchCounter === activeMatchIndex;
        return (
          <mark
            key={`${i}-${debouncedSearch}`}
            className={`highlight-anim px-1 text-secondary-content rounded duration-300 ${
              isActive ? " ring-2 ring-primary ring-offset-2 bg-primary" : "bg-secondary"
            }`}
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  // calculate match count
  const matchCount = matches.length;

  const suggestions = useMemo(() => {
    if (search.length < 1) return [];
    const words = Array.from(new Set(text.split(/\W+/)));
    return words
      .filter((w) => w.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [search]);

  const handleSuggestionClick = (word: string) => {
    setSearch(word);
    setIsFocused(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFocused && suggestions.length > 0) {
      // navigating suggestions
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[activeIndex]);
      }
    }
  };

  const goNextMatch = () => {
    if (matches.length > 0) {
      setActiveMatchIndex((prev) => (prev < matches.length - 1 ? prev + 1 : 0));
    }
  };

  const goPrevMatch = () => {
    if (matches.length > 0) {
      setActiveMatchIndex((prev) => (prev > 0 ? prev - 1 : matches.length - 1));
    }
  };

  return (
    <div className="relative">
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
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
          />

          {/* suggestions dropdown */}
          {isFocused && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-md z-50">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className={`px-3 py-2 cursor-pointer ${
                    i === activeIndex ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* result info + arrows */}
        {debouncedSearch.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            {debouncedSearch.length < 3 ? (
              <Message classname="text-info">
                Type at least 3 characters to start searching
              </Message>
            ) : matchCount > 0 ? (
              <div className="flex items-center gap-2">
                <Message classname="text-success">
                  Results: {matchCount}
                </Message>
                <Button
                  onClick={goPrevMatch}
                  size="sm"
                  className="rounded-sm"
                  theme="accent"
                >
                  ↑
                </Button>
                <Button
                  onClick={goNextMatch}
                  size="sm"
                  className="rounded-sm"
                  theme="accent"
                >
                  ↓
                </Button>
              </div>
            ) : (
              <Message classname="text-error">No results found</Message>
            )}
          </div>
        )}

        <div className="border border-primary p-4 rounded-lg mt-6 leading-relaxed h-[55vh] min-h-[20rem] overflow-y-scroll">
          {highlightText(text, debouncedSearch)}
        </div>
      </div>
    </div>
  );
}
