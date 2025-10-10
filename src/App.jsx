import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AddMission from "./pages/Addmission";
import Login from "./pages/Login";
import { MissionProvider } from "./contexts/MissionContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MissionProvider>
          <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path="missions" element={<AddMission />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </MissionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
