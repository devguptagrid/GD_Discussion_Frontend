import { useState } from "react";
import QuestionCard from "./QuestionCard";
import InputBox from "./InputBox";

const ChatPanel = ({ questions, onUpdateQuestions, selectedQuestion, onSelectQuestion }) => {
  const [mode, setMode] = useState("question");

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "question") onSelectQuestion(null);
  };

  const handleAnswer = (question) => {
    setMode("answer");
    onSelectQuestion(question);
  };

  const handleSend = (text) => {
    if (mode === "question") {
      const newQ = {
        id: Date.now(),
        text,
        user: "You",
        timestamp: "Just now",
        answers: [],
      };
      onUpdateQuestions([newQ, ...questions]);
    } else if (mode === "answer" && selectedQuestion) {
      const newAnswer = {
        id: Date.now(),
        text,
        user: "You",
        upvotes: 0,
        isBest: false,
      };
      const updated = questions.map((q) =>
        q.id === selectedQuestion.id
          ? { ...q, answers: [...q.answers, newAnswer] }
          : q
      );
      onUpdateQuestions(updated);
      onSelectQuestion(null);
      setMode("question");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border bg-card">
        <h2 className="text-lg font-bold text-foreground">Discussion Feed</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {questions.length} questions
        </p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-2">
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            isSelected={selectedQuestion?.id === q.id}
            onSelect={onSelectQuestion}
            onAnswer={handleAnswer}
          />
        ))}
      </div>

      <InputBox
        mode={mode}
        onModeChange={handleModeChange}
        selectedQuestion={selectedQuestion}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatPanel;
