import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import SideMenu from "../components/SideMenu";
import "./Login.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/missions");
    },
    [isAuthenticated, navigate]
  );

  return (
    <>
      <PageHeader />
      <main className="mainContainer">
        <SideMenu />
        <div className="formAssignmentContainer">
          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div className="formField">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formField">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="button">Submit</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
