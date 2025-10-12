import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import styles from "./PageHeader.module.css";

export default function PageHeader({ headerType }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={styles.pageHeader}>
      <p
        className={styles.logo}
        onClick={() => {
          navigate("/");
        }}
      >
        CheckInTracker
      </p>
      <div>
        {user ? (
          <Button
            onClick={logout}
            type={headerType === "homepage" ? "light" : "dark"}
          >
            {"Log out"}
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
            type={headerType === "homepage" ? "light" : "dark"}
          >
            {"Log in"}
          </Button>
        )}
      </div>
    </div>
  );
}
