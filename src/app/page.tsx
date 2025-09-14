'use client';
import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Input from '@/components/Input';
import Magnifer from '%/magnifer.svg';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { text } from '@/utils/constants';
import { escapeRegex } from '@/utils/funcs/regex';
import Message from '@/components/Message';
import Button from '@/components/Button';

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [isFocused, setIsFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeMatchIndex, setActiveMatchIndex] = useState(-1);
    const debouncedSearch = useDebounce(search, 500);

    const markRefs = useRef<HTMLElement[]>([]);

    // Update URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (debouncedSearch.length >= 3) params.set('q', debouncedSearch);
        else params.delete('q');
        router.replace(`?${params.toString()}`);
        setActiveMatchIndex(-1);
    }, [debouncedSearch, router]);

    // Compute matches
    const matches = useMemo(() => {
        if (!debouncedSearch || debouncedSearch.length < 3) return [];
        const regex = new RegExp(escapeRegex(debouncedSearch), 'gi');
        const arr: { start: number; end: number; text: string }[] = [];
        for (const m of text.matchAll(regex)) {
            if (m.index !== undefined) {
                arr.push({
                    start: m.index,
                    end: m.index + m[0].length,
                    text: m[0],
                });
            }
        }
        return arr;
    }, [debouncedSearch]);

    // Arrow navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (matches.length === 0) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveMatchIndex((prev) =>
                    prev < matches.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveMatchIndex((prev) =>
                    prev > 0 ? prev - 1 : matches.length - 1
                );
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [matches]);

    // Auto-scroll
    useLayoutEffect(() => {
        if (activeMatchIndex >= 0 && markRefs.current[activeMatchIndex]) {
            markRefs.current[activeMatchIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [activeMatchIndex]);

    // Highlight function
    const highlightText = () => {
        if (!debouncedSearch || debouncedSearch.length < 3) return text;

        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        markRefs.current = []; // reset refs

        matches.forEach((match, idx) => {
            // text before match
            if (match.start > lastIndex) {
                parts.push(text.slice(lastIndex, match.start));
            }
            // the match itself
            const isActive = idx === activeMatchIndex;
            parts.push(
                <mark
                    key={idx}
                    ref={(el) => {
                        if (el) markRefs.current[idx] = el;
                    }}
                    className={`highlight-anim px-1 text-secondary-content rounded duration-300 cursor-pointer ${
                        isActive
                            ? 'ring-2 ring-primary ring-offset-2 bg-primary'
                            : 'bg-secondary'
                    }`}
                    onClick={() => setActiveMatchIndex(idx)}
                >
                    {match.text}
                </mark>
            );
            lastIndex = match.end;
        });

        // remaining text
        if (lastIndex < text.length) parts.push(text.slice(lastIndex));

        return parts;
    };

    const matchCount = matches.length;

    // Suggestions
    const suggestions = useMemo(() => {
        if (!search) return [];
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
        if (!isFocused || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1
            );
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[activeIndex]);
        }
    };

    return (
        <div className='relative'>
            <div className='container py-10 max-w-4xl'>
                <div className='relative'>
                    <Input
                        icon={<Magnifer />}
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() =>
                            setTimeout(() => setIsFocused(false), 200)
                        }
                        onKeyDown={handleKeyDown}
                        isAnimated
                    />

                    {isFocused && suggestions.length > 0 && (
                        <ul className='absolute left-0 right-0 mt-1 border border-gray-300 bg-white rounded-lg shadow-md z-50'>
                            {suggestions.map((s, i) => (
                                <li
                                    key={i}
                                    className={`px-3 py-2 cursor-pointer ${
                                        i === activeIndex
                                            ? 'bg-gray-200'
                                            : 'hover:bg-gray-100'
                                    }`}
                                    onMouseDown={() => handleSuggestionClick(s)}
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {debouncedSearch.length > 0 && (
                    <div className='flex items-center gap-2 mt-2'>
                        {debouncedSearch.length < 3 ? (
                            <Message classname='text-info'>
                                Type at least 3 characters to start searching
                            </Message>
                        ) : matchCount > 0 ? (
                            <div className='flex items-center gap-2'>
                                <Message classname='text-success'>
                                    Results: {matchCount}
                                </Message>
                                <Button
                                    onClick={() =>
                                        setActiveMatchIndex((prev) =>
                                            prev > 0 ? prev - 1 : matchCount - 1
                                        )
                                    }
                                    size='sm'
                                    theme='accent'
                                    className='rounded-sm'
                                >
                                    ↑
                                </Button>
                                <Button
                                    onClick={() =>
                                        setActiveMatchIndex((prev) =>
                                            prev < matchCount - 1 ? prev + 1 : 0
                                        )
                                    }
                                    size='sm'
                                    theme='accent'
                                    className='rounded-sm'
                                >
                                    ↓
                                </Button>
                            </div>
                        ) : (
                            <Message classname='text-error'>
                                No results found
                            </Message>
                        )}
                    </div>
                )}

                <div className='border border-primary p-4 rounded-lg mt-6 leading-relaxed h-[55vh] min-h-[20rem] overflow-y-scroll'>
                    {highlightText()}
                </div>
            </div>
        </div>
    );
}
