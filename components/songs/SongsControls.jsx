"use client";

import { Check, ChevronDown, Grid3x3, List, SortAsc } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const SORT_OPTIONS = [
  { value: "title", label: "Alphabetical" },
  { value: "featured", label: "Featured First" },
];

const SongsControls = memo(function SongsControls({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}) {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);

  const selectedSortOption = useMemo(
    () => SORT_OPTIONS.find((option) => option.value === sortBy),
    [sortBy]
  );

  const toggleDropdown = useCallback(
    () => setIsSortDropdownOpen((prev) => !prev),
    []
  );

  const handleSortChange = useCallback(
    (value) => {
      onSortChange(value);
      setIsSortDropdownOpen(false);
    },
    [onSortChange]
  );

  const handleViewModeChange = useCallback(
    (mode) => onViewModeChange(mode),
    [onViewModeChange]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current?.contains(event.target)) return;
      setIsSortDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      <div className="flex items-center bg-muted rounded-xl p-1">
        <button
          onClick={() => handleViewModeChange("grid")}
          className={`p-2 sm:p-2.5 rounded-lg transition-all duration-200 ${
            viewMode === "grid"
              ? "bg-surface shadow-sm text-primary-300"
              : "text-text-dim hover:text-text"
          }`}
          aria-label="Grid view"
        >
          <Grid3x3 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </button>
        <button
          onClick={() => handleViewModeChange("list")}
          className={`p-2 sm:p-2.5 rounded-lg transition-all duration-200 ${
            viewMode === "list"
              ? "bg-surface shadow-sm text-primary-300"
              : "text-text-dim hover:text-text"
          }`}
          aria-label="List view"
        >
          <List className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <SortAsc
          className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-text-dim"
          aria-hidden="true"
        />
        <div className="relative" ref={sortDropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between gap-2 sm:gap-3 bg-muted backdrop-blur-sm border border-border/50 text-text px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium cursor-pointer hover:bg-surface hover:border-primary/30 transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 shadow-sm hover:shadow-md min-w-[120px] sm:min-w-[140px]"
            aria-expanded={isSortDropdownOpen}
            aria-haspopup="listbox"
          >
            <span className="truncate">{selectedSortOption?.label}</span>
            <ChevronDown
              className={`w-3.5 sm:w-4 h-3.5 sm:h-4 text-text-dim transition-transform duration-200 flex-shrink-0 ${
                isSortDropdownOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {isSortDropdownOpen && (
            <div
              className="absolute top-full mt-2 left-0 right-0 bg-surface/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl shadow-bg/40 z-50 overflow-hidden animate-fade-in"
              role="listbox"
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 hover:bg-muted ${
                    sortBy === option.value
                      ? "bg-primary/10 text-primary-300"
                      : "text-text-dim"
                  }`}
                  role="option"
                  aria-selected={sortBy === option.value}
                >
                  <span>{option.label}</span>
                  {sortBy === option.value && (
                    <Check
                      className="w-4 h-4 text-primary-300"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default SongsControls;
