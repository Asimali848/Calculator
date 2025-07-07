import { Outlet } from "react-router-dom";

// import AppSidebar from "./app-sidebar";
// import Navbar from "./navbar";

const GlobalLayout = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full items-start justify-start bg-gray-200 dark:bg-black md:mt-0 md:overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default GlobalLayout;
