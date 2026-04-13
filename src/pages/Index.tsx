import { useState, useRef, useCallback } from "react";
import { mockQuestions } from "../data/mockData";
import SearchPanel from "../components/doubt/SearchPanel";
import ChatPanel from "../components/doubt/ChatPanel";
import QAView from "../components/doubt/QAView";
import AccountDrawer from "@/components/account/AccountDrawer";
import { useNavigate } from "react-router-dom";
import MembersDrawer from "@/components/account/MembersDrawer";

const Index = () => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [activeView, setActiveView] = useState("chat");
  const [selectedQA, setSelectedQA] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [panelWidth, setPanelWidth] = useState(320);
  const isDragging = useRef(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const users = [
  JSON.parse(localStorage.getItem("user") || "{}"),
];
const user =
  JSON.parse(localStorage.getItem("user") || "{}")
;
  const [isMembersOpen, setIsMembersOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const navigate = useNavigate();
  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const newWidth = Math.max(240, Math.min(600, e.clientX));
      setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleSelectResult = (question) => {
    setSelectedQA(question);
    setActiveView("qa_view");
  };

  const handleBack = () => {
    setActiveView("chat");
    setSelectedQA(null);
  };

  const relatedQuestions = selectedQA
    ? questions.filter((q) => q.id !== selectedQA.id).slice(0, 3)
    : [];

  return (
  <div className="flex flex-col h-screen bg-background">
    {/* Header */}
<div className="h-14 flex items-center justify-between px-6 border-b bg-background shrink-0">
  
  {/* Left */}
  <div className="font-semibold text-lg">
    GRID Doubt
  </div>

  {/* Right */}
  <div className="flex items-center gap-3">

    {/* Members Button */}
    <button
  onClick={() => setIsMembersOpen(true)}
  className="flex items-center gap-2 px-3 py-1 rounded-full border hover:bg-muted transition"
>
  Members
</button>

    {/* Account Button */}
    <button
  onClick={() => navigate("/account")}
  className="flex items-center gap-2 px-3 py-1 rounded-full border hover:bg-muted transition"
>
  <div className="w-6 h-6 rounded-full overflow-hidden bg-muted flex items-center justify-center">
    {user?.image ? (
      <img src={user.image} className="w-full h-full object-cover" />
    ) : (
      <span className="text-xs font-semibold">
        {user?.firstName?.charAt(0) || "U"}
      </span>
    )}
  </div>

  <span className="text-sm font-medium">
    {user?.firstName || "User"}
  </span>
</button>

  </div>
</div>
{/* Main */}
  <div className="flex flex-1 overflow-hidden">
      {/* Left Panel */}
      <div
        style={{ width: panelWidth, minWidth: 240, maxWidth: 600 }}
        className="shrink-0 border-r border-border h-full"
      >
        <SearchPanel
          activeResultId={selectedQA?.id}
          onSelectResult={handleSelectResult}
        />
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="w-1 cursor-col-resize bg-border hover:bg-primary/30 transition-colors shrink-0"
      />

      {/* Right Panel */}
      <div className="flex-1 min-w-0 h-full">
        {activeView === "chat" ? (
          <ChatPanel
            questions={questions}
            onUpdateQuestions={setQuestions}
            selectedQuestion={selectedQuestion}
            onSelectQuestion={setSelectedQuestion}
          />
        ) : (
          <QAView
            question={selectedQA}
            relatedQuestions={relatedQuestions}
            onBack={handleBack}
            onSelectRelated={handleSelectResult}
          />
        )}
      </div>
    </div>
    <MembersDrawer
  isOpen={isMembersOpen}
  onClose={() => setIsMembersOpen(false)}
  users={users}
  onSelectUser={(user) => {
    setSelectedUser(user);
    setIsAccountOpen(true);
  }}
/>
    <AccountDrawer
  open={isAccountOpen}
  onOpenChange={setIsAccountOpen}
  user={user}
/>

    </div>
  );
};

export default Index;
