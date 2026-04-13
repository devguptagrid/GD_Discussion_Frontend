import { Sheet, SheetContent } from "@/components/ui/sheet";

const AccountDrawer = ({ open, onOpenChange, user }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[350px] p-6">

        {/* Profile */}
        <div className="flex flex-col items-center gap-3">

          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
            {user?.image ? (
              <img src={user.image} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-semibold">
                {user?.firstName?.charAt(0) || "U"}
              </div>
            )}
          </div>

          <h2 className="text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="text-sm text-muted-foreground capitalize">
            {user?.role}
          </p>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-4 text-sm">

          <div>
            <p className="text-muted-foreground">Domain</p>
            <p className="font-medium">{user?.domain || "-"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email || "-"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Position</p>
            <p className="font-medium">{user?.position || "-"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Location</p>
            <p className="font-medium">{user?.location || "-"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Contact</p>
            <p className="font-medium">{user?.contact || "-"}</p>
          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
};

export default AccountDrawer;