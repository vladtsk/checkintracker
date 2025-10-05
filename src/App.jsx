import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AddMission from "./pages/Addmission";
import Login from "./pages/Login";
import { MissionProvider } from "./contexts/MissionContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <MissionProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path="missions" element={<AddMission />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </MissionProvider>
    </AuthProvider>
  );
}

export default App;
