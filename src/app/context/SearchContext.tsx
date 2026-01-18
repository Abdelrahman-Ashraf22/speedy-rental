"use client";
import React, { createContext, useContext, useState } from "react";
import Sidebar from "../component/sidebar";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: (query: string) => boolean;
  setOnSearch: (fn: (query: string) => boolean) => void;
  currentBgColor: string;
  setCurrentBgColor: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [onSearch, setOnSearchState] = useState<
    ((query: string) => boolean) | undefined
  >();

  const [currentBgColor, setCurrentBgColor] = useState("#597a64"); // Default to first slide color

  const setOnSearch = (fn: (query: string) => boolean) => {
    setOnSearchState(() => fn);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        onSearch,
        setOnSearch,
        currentBgColor,
        setCurrentBgColor,
      }}
    >
      <Sidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={onSearch}
        currentBgColor={currentBgColor}
      />
      {children}
    </SearchContext.Provider>
  );
};
