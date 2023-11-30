// components/PrivateRoute.js
import { useRouter } from "next/router";
import { useAuth } from "../utils/authContext";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (user === null) {
      router.replace("/auth/login");
    }
  }, [user, router]);

  return user ? <>{children}</> : null;
};

export default PrivateRoute;
