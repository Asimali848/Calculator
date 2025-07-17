import { Route, Routes } from "react-router-dom";

import GlobalLayout from "./components/global-layout";
import RouteGuard from "./components/route-guard";
import Billing from "./pages/billing";
// import RouteGuard from "./components/route-guard";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        element={
          <RouteGuard>
            <GlobalLayout />
          </RouteGuard>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/billing" element={<Billing />} />
      </Route>
    </Routes>
  );
};

export default App;
