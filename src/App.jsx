import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AddMission from "./pages/Addmission";
import Login from "./pages/Login";
import { MissionProvider } from "./contexts/MissionContext";

function App() {
  return (
    <MissionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="mission" element={<HomePage />}></Route>
          <Route index element={<AddMission />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </MissionProvider>
  );
}

export default App;
