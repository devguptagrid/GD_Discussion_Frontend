import { X } from "lucide-react";
import { useState } from "react";


const MembersDrawer = ({ isOpen, onClose, users, onSelectUser }) => {
    const [search, setSearch] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      
      <div className="w-[320px] bg-background h-full shadow-lg p-4 flex flex-col">
        
        {/* Header */}
        {/* Header */}
<div className="mb-4">
  
  {/* Top Row */}
  <div className="flex justify-between items-center mb-3">
    <h2 className="font-semibold text-lg">Members</h2>
    <button onClick={onClose}>
      <X size={18} />
    </button>
  </div>

  {/* Search BELOW title */}
  <input
    type="text"
    placeholder="Search members..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full px-4 py-2 rounded-full border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
  />
</div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {users
  .filter((user) =>
    user?.firstName?.toLowerCase().includes(search.toLowerCase())
  )
  .map((user) => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user)}
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted"
            >
              <img
                src={user.image || "/placeholder.png"}
                className="w-8 h-8 rounded-full object-cover"
              />

              <div>
                <p className="text-sm font-medium">
                  {user.firstName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MembersDrawer;