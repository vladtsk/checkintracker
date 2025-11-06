import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import styles from "./PageHeader.module.css";

export default function PageHeader({ headerType }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { userData } = useAuth();

  return (
    <div className={`${styles.pageHeader} ${styles[headerType]}`}>
      <p
        className={styles.logo}
        onClick={() => {
          navigate("/");
        }}
      >
        CheckInTracker
      </p>
      <div className={styles.btndiv}>
        {user ? (
          <div className={styles.logoutDiv}>
            <Button
              onClick={logout}
              type={headerType === "homepage" ? "light" : "header"}
            >
              {"Se déconnecter"}
            </Button>
            {headerType !== "homepage" && (
              <div
                className={styles.userIcon}
                onClick={() => {
                  navigate("/user");
                }}
              >
                {userData && userData.name
                  ? userData.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}
          </div>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
            type={headerType === "homepage" ? "light" : "header"}
          >
            {"Se connecter"}
          </Button>
        )}
      </div>
    </div>
  );
}
