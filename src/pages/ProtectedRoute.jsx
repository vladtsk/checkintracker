import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated:", isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;

  /*const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  return children;

*/
}
export default ProtectedRoute;
