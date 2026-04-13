import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthPage = ( ) => {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
  const email = "user@griddynamics.com"; // TEMP

  if (!email.endsWith("@griddynamics.com")) {
    alert("Only Grid Dynamics email allowed");
    return;
  }

  const existingUser = localStorage.getItem("user");

  if (existingUser) {
    navigate("/home");
  } else {
    navigate("/profile");
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 p-10 rounded-2xl shadow-lg border bg-card">
        
        {/* Logo */}
        <img
          src="/grid logo.png"
          alt="Grid Dynamics Logo"
          className="w-20 h-20"
        />

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Grid Dynamics Discussion
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Internal doubt-solving platform
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Button onClick={handleGoogleLogin}>
            Login with Google
          </Button>

          
        </div>
      </div>
    </div>
  );
};

export default AuthPage;