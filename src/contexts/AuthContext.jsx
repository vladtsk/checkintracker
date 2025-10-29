import { createContext, useContext, useEffect, useReducer } from "react";
import {
  signInWithEmailAndPassword,
  auth,
  signOut,
  database,
  ref,
  update,
  push,
  remove,
  onValue,
} from "../../firebase/firebaseConfig";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "../../firebase/firebaseConfig";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  userData: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
        userData: {},
      };
    case "setUserData":
      return { ...state, userData: action.payload };

    case "error":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error, userData }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch({ type: "login", payload: currentUser });
      } else dispatch({ type: "logout" });
    });

    return () => unsubscribe();
  }, []);

  // Get userInfo from DB
  useEffect(() => {
    if (!user || !user.uid) return;
    const dbRef = `/users/${user.uid}/userdata`;
    const unsubscribe = onValue(ref(database, dbRef), (snapshot) => {
      console.log("userData", snapshot.val());
      dispatch({ type: "setUserData", payload: snapshot.val() });
    });
    return () => unsubscribe();
  }, [user]);

  const navigate = useNavigate();

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        dispatch({ type: "login", payload: user });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage;
        switch (errorCode) {
          case "auth/invalid-credential":
            errorMessage = "Incorrect email or password";
            break;

          case "auth/invalid-email":
            errorMessage = "Incorrect email address";
            break;

          case "auth/user-not-found":
            errorMessage = "It seems that you don't have an account yet.";
            break;

          default:
            errorMessage = "Unknown error.";
        }

        dispatch({ type: "error", payload: errorMessage });
      });
  }

  function logout() {
    navigate("/");
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
    dispatch({ type: "logout" });
  }

  function addUserDataToDb(data) {
    if (!user) return;

    const dbRef = `/users/${user.uid}/userdata`;
    update(ref(database, dbRef), data);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        error,
        dispatch,
        addUserDataToDb,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext is used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
