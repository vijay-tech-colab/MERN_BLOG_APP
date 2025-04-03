import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helpers/farebase";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { RoutesIndex } from "@/helpers/routeName";
import { useNavigate } from "react-router-dom";
function GoogleLogin() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;
    const bodyData = {
        name : user.displayName,
        email : user.email,
        avatar : user.photoURL
    } 
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      navigate(RoutesIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FcGoogle />
      continue with Google
    </Button>
  );
}

export default GoogleLogin;
