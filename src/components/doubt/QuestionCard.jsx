import { MessageCircle } from "lucide-react";
import AnswerItem from "./AnswerItem";

const QuestionCard = ({ question, isSelected, onSelect, onAnswer }) => {
  return (
    <div
      className={`rounded-[2px] border transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
          : "border-border bg-card hover:shadow-sm"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-md font-medium text-foreground leading-snug flex-1">
            {question.text}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAnswer(question);
            }}
            className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
          >
            <MessageCircle size={13} />
            Answer
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-medium text-muted-foreground">{question.user}</span>
          <span className="text-xs text-muted-foreground/50">·</span>
          <span className="text-xs text-muted-foreground">{question.timestamp}</span>
          <span className="text-xs text-muted-foreground/50">·</span>
          <span className="text-xs text-muted-foreground">{question.answers.length} answers</span>
        </div>
      </div>

      {question.answers.length > 0 && (
        <div className="px-4 pb-4 space-y-2 ">
          {question.answers.map((ans) => (
            <AnswerItem key={ans.id} answer={ans} isBest={ans.isBest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
