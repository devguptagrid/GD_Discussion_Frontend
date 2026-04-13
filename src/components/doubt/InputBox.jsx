import { useState } from "react";
import { Send, HelpCircle, MessageSquare } from "lucide-react";

const InputBox = ({ mode, onModeChange, selectedQuestion, onSend }) => {
  const [text, setText] = useState("");

  const canSend =
    text.trim() &&
    ((mode === "question") || (mode === "answer" && selectedQuestion));

  const handleSend = () => {
    if (!canSend) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-card p-4 space-y-3">
      {mode === "answer" && selectedQuestion && (
        <div className="text-xs text-muted-foreground bg-secondary rounded-xl px-3 py-2 truncate">
          Answering: <span className="font-medium text-foreground">{selectedQuestion.text}</span>
        </div>
      )}
      {mode === "answer" && !selectedQuestion && (
        <div className="text-xs text-muted-foreground bg-destructive/10 rounded-xl px-3 py-2">
          Please select a question to answer by clicking "Answer" on a question card above.
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="flex bg-muted rounded-full p-1 gap-1">
          <button
            onClick={() => onModeChange("question")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3  rounded-full transition-all ${
              mode === "question"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <HelpCircle size={13} />
            Ask
          </button>
          <button
            onClick={() => onModeChange("answer")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full transition-all ${
              mode === "answer"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare size={13} />
            Answer
          </button>
        </div>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            mode === "question"
              ? "Type your question..."
              : selectedQuestion
              ? "Write your answer..."
              : "Select a question first..."
          }
          disabled={mode === "answer" && !selectedQuestion}
          className="flex-1 bg-muted rounded-full px-4 py-1 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={!canSend}
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
