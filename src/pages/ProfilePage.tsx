import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const { toast } = useToast();
const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [user, setUser] = useState(storedUser);

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };



  
  const handleSave = () => {
  localStorage.setItem("user", JSON.stringify(user));

  toast({
    title: "Profile updated",
    description: "✅Your details have been saved successfully.",
  });

  setTimeout(() => {
    navigate("/home");
  }, 1000); // small delay so user sees toast
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
  <div className="w-[420px] p-8 rounded-2xl border shadow-md bg-card space-y-6">

      <h2 className="text-xl font-semibold">My Profile</h2>

      {/* Image */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-24 rounded-full bg-muted overflow-hidden">
          {user.image && (
            <img src={user.image} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="flex flex-col items-center gap-2 mt-2">
  
  {/* Hidden input */}
  <input
    type="file"
    id="fileUpload"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        handleChange("image", URL.createObjectURL(file));
      }
    }}
  />

  {/* Custom button */}
  <label
    htmlFor="fileUpload"
    className="text-xs text-primary cursor-pointer hover:underline"
  >
    Choose file
  </label>
</div>
      </div>

      {/* Name */}
      <div className="flex gap-3">
        <Input
          value={user.firstName || ""}
          placeholder="First Name"
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <Input
          value={user.lastName || ""}
          placeholder="Last Name"
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </div>

      {/* Role */}
      <div className="flex gap-3">
  <button
    onClick={() => handleChange("role", "mentor")}
    className={`flex-1 py-2 rounded-lg border ${
      user.role === "mentor"
        ? "bg-primary text-white"
        : "bg-background"
    }`}
  >
    Mentor
  </button>

  <button
    onClick={() => handleChange("role", "intern")}
    className={`flex-1 py-2 rounded-lg border ${
      user.role === "intern"
        ? "bg-primary text-white"
        : "bg-background"
    }`}
  >
    Intern
  </button>
</div>

      {/* Domain */}
      <Select
  value={user.domain}
  onValueChange={(value) => handleChange("domain", value)}
>
  <SelectTrigger>
    <SelectValue placeholder="Select Domain" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="Data Science">Data Science</SelectItem>
    <SelectItem value="Java Full Stack">Java Full Stack</SelectItem>
    <SelectItem value="Python Full Stack">Python Full Stack</SelectItem>
    <SelectItem value="DevOps">DevOps</SelectItem>
    <SelectItem value="UI">UI</SelectItem>
    <SelectItem value="Others">Others</SelectItem>
  </SelectContent>
</Select>

      {/* Position */}
      <Input
        value={user.position || ""}
        placeholder="Position (T1-T7)"
        onChange={(e) => handleChange("position", e.target.value)}
      />

      {/* Location */}
      <Input
        value={user.location || ""}
        placeholder="Location"
        onChange={(e) => handleChange("location", e.target.value)}
      />

      {/* Contact */}
      <Input
        value={user.contact || ""}
        placeholder="Contact Number"
        onChange={(e) => handleChange("contact", e.target.value)}
      />

      {/* Save */}
      <Button className="w-full"  onClick={handleSave}>
        Save Changes
      </Button>

    </div>
    </div>
  );
};

export default ProfilePage;