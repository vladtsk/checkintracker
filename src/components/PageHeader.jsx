import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import styles from "./PageHeader.module.css";

export default function PageHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={styles.pageHeader}>
      <p className={styles.logo}> CheckInTracker</p>
      <div>
        {user ? (
          <Button onClick={logout}>{"Log out"}</Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            {"Log in"}
          </Button>
        )}
      </div>
    </div>
  );
}
