import { Outlet } from "react-router-dom";

import Navbar from "./navbar";


const GlobalLayout = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-full max-w-7xl flex-col items-start justify-start bg-background dark:bg-black md:mt-0 md:overflow-hidden">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default GlobalLayout;
