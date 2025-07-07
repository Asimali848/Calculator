import { Route, Routes } from "react-router-dom";

import GlobalLayout from "./components/global-layout";
// import RouteGuard from "./components/route-guard";
import Home from "./pages/home";
import Login from "./pages/login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        element={
          // <RouteGuard>
          <GlobalLayout />
          // </RouteGuard>
        }
      >
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
