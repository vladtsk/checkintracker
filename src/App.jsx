import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";

import Login from "./pages/Login";
import { MissionProvider } from "./contexts/MissionContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddMission from "./pages/AddMission";
import UserInfo from "./pages/UserInfo";
import InvoicePage from "./pages/InvoicePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MissionProvider>
          <Routes>
            <Route index element={<HomePage />}></Route>
            <Route
              path="missions"
              element={
                <ProtectedRoute>
                  <AddMission />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="user"
              element={
                //<ProtectedRoute>
                <UserInfo />
                //</ProtectedRoute>
              }
            ></Route>
            <Route
              path="invoice"
              element={
                //<ProtectedRoute>
                <InvoicePage />
                //</ProtectedRoute>
              }
            ></Route>
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </MissionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
