import { useState } from "react";
import { Search } from "lucide-react";
import { getSearchResults } from "../../data/mockData";

const SearchPanel = ({ activeResultId, onSelectResult }) => {
  const [query, setQuery] = useState("");
  const results = getSearchResults(query);

  return (
    <div className="flex flex-col h-full bg-panel-bg">
      <div className="p-4 border-b border-border bg-card sticky top-0 z-10">
        <div className="relative">
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-muted rounded-full pl-4 py-1 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-2">
        {query && results.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            No questions found for "{query}"
          </p>
        )}

        {!query && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Start typing to search questions
          </p>
        )}

        {results.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelectResult(r)}
            className={`w-full text-left rounded-xl p-3 transition-all ${
              activeResultId === r.id
                ? "bg-primary/10 border border-primary/20"
                : "bg-card border border-transparent hover:border-border hover:shadow-sm"
            }`}
          >
            <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
              {r.text}
            </p>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
              {r.preview}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;
