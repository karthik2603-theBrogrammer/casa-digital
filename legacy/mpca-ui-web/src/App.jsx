import LandingPage from "./Components/LandingPage";
import Dashboard from "./Components/Dashboard";
import Admin from "./Components/Admin";
import { useSnapshot } from "valtio";
import state from "./store";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
function App() {
  const snap = useSnapshot(state);
  return (
    <div className="h-[100vh] w-[100vw] overflow-x-hidden bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <AnimatePresence className="">
        {snap.page === "intro" && <LandingPage />}
        {snap.page === "dashboard" && <Dashboard />}
        {snap.page === "admin" && <Admin />}

      </AnimatePresence>
    </div>
  );
}

export default App;
