
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth(); // assuming you have this

  const logout = async () => {
    await signOut(auth); // Firebase signOut
    setCurrentUser(null); // Clear from context
    navigate("/login"); // Redirect to login
  };

  return logout;
};
