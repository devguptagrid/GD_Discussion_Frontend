import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const domains = [
  "Data Science",
  "Java Full Stack",
  "Python Full Stack",
  "DevOps",
  "UI",
  "Others",
];

const ProfileSetup = () => {
  const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [domain, setDomain] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // preview
    }
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !role || !domain){
      alert("Please fill all fields");
      return;
    }

    const userData = {
      firstName,
        lastName,
      role,
      domain,
      image,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    navigate("/home");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col gap-5 p-8 rounded-2xl shadow-lg border bg-card w-[400px]">

        <h2 className="text-xl font-semibold text-center">
          Complete Your Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-2">
  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
    {image ? (
      <img src={image} className="w-full h-full object-cover" />
    ) : (
      <span className="text-xs text-muted-foreground">Upload</span>
    )}
  </div>

  {/* Hidden input */}
  <input
    id="fileUpload"
    type="file"
    onChange={handleImageUpload}
    className="hidden"
  />

  {/* Custom button */}
  <label
    htmlFor="fileUpload"
    className="text-xs text-primary cursor-pointer hover:underline"
  >
    Choose file
  </label>
</div>

        {/* Name */}
        <div className="flex gap-3">
  <Input
    placeholder="First Name"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    className="flex-1"
  />

  <Input
    placeholder="Last Name"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    className="flex-1"
  />
</div>

        {/* Role */}
        <div className="flex gap-3">
          <Button
            variant={role === "mentor" ? "default" : "outline"}
            onClick={() => setRole("mentor")}
            className="flex-1"
          >
            Mentor
          </Button>

          <Button
            variant={role === "intern" ? "default" : "outline"}
            onClick={() => setRole("intern")}
            className="flex-1"
          >
            Intern
          </Button>
        </div>

        {/* Domain */}
        <div>
  <Select onValueChange={(value) => setDomain(value)}>
    <SelectTrigger>
      <SelectValue placeholder="Select Domain" />
    </SelectTrigger>

    <SelectContent>
      {domains.map((d) => (
        <SelectItem key={d} value={d}>
          {d}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

        {/* Submit */}
        <Button onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;