import { ArrowLeft } from "lucide-react";
import AnswerItem from "./AnswerItem";

const QAView = ({ question, relatedQuestions, onBack, onSelectRelated }) => {
  const bestAnswer = question.answers.find((a) => a.isBest);
  const otherAnswers = question.answers.filter((a) => !a.isBest);

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border bg-card flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-6">
        {/* Question */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-base font-semibold text-foreground leading-relaxed">
            {question.text}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs font-medium text-muted-foreground">{question.user}</span>
            <span className="text-xs text-muted-foreground/50">·</span>
            <span className="text-xs text-muted-foreground">{question.timestamp}</span>
          </div>
        </div>

        {/* Best Answer */}
        {bestAnswer && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 px-1">
              Best Answer
            </h3>
            <AnswerItem answer={bestAnswer} isBest />
          </div>
        )}

        {/* Other Answers */}
        {otherAnswers.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">
              Other Answers ({otherAnswers.length})
            </h3>
            <div className="space-y-2">
              {otherAnswers.map((ans) => (
                <AnswerItem key={ans.id} answer={ans} />
              ))}
            </div>
          </div>
        )}

        {/* Related Questions */}
        {relatedQuestions.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">
              Related Questions
            </h3>
            <div className="space-y-2">
              {relatedQuestions.map((rq) => (
                <button
                  key={rq.id}
                  onClick={() => onSelectRelated(rq)}
                  className="w-full text-left bg-card border border-border rounded-xl p-3 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-medium text-foreground">{rq.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rq.answers.length} answers</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QAView;
