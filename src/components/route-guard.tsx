// import { ReactNode, useEffect, useState } from "react";

// import { Loader2 } from "lucide-react";
// import { Navigate } from "react-router-dom";

// const RouteGuard = ({ children }: { children: ReactNode }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = () => {
//       setIsLoading(true);
//       const token = localStorage.getItem("authToken") || localStorage.getItem("access");

//       setIsAuthenticated(!!token);
//       setIsLoading(false);
//     };

//     checkAuth();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-background">
//         <Loader2 className="size-16 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// export default RouteGuard;


import { ReactNode, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [forceLogout, setForceLogout] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);

      const token =
        localStorage.getItem("authToken") || localStorage.getItem("access");

      if (!token || token.trim() === "") {
        // token cleared or empty → go to logout page
        setForceLogout(true);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setForceLogout(false);
      }

      setIsLoading(false);
    };

    checkAuth();

    // Optional: Listen for localStorage changes (e.g., in other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-background">
        <Loader2 className="size-16 animate-spin text-primary" />
      </div>
    );
  }

  if (forceLogout) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
