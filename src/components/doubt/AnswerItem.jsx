import { useState } from "react";
import { ThumbsUp } from "lucide-react";

const AnswerItem = ({ answer, isBest }) => {
  const [upvotes, setUpvotes] = useState(answer.upvotes);
  const [voted, setVoted] = useState(false);

  const handleUpvote = () => {
    if (voted) {
      setUpvotes(upvotes - 1);
      setVoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setVoted(true);
    }
  };

  return (
    <div
      className={`flex gap-2 p-3 border border-primary/20 rounded-xl transition-colors ${
        isBest ? "bg-secondary border border-primary/20" : "bg-muted/50"
      }`}
    >
      <button
        onClick={handleUpvote}
        className={`flex flex-col items-center pt-2 gap-1 transition-colors ${
          voted ? "text-primary" : "text-muted-foreground hover:text-primary"
        }`}
      >
        <ThumbsUp size={14} className={voted ? "fill-current" : ""} />
        <span className="text-xs font-semibold">{upvotes}</span>
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-relaxed">{answer.text}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-muted-foreground">— {answer.user}</span>
          {isBest && (
            <span className="text-sm font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Best Answer
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerItem;
