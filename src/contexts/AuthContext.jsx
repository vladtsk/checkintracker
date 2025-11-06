import { createContext, useContext, useEffect, useReducer } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  auth,
  signOut,
  database,
  ref,
  update,
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
  loading: false,
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
    case "signup":
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

    case "loading":
      return { ...state, loading: true, error: null };
    case "loaded":
      return { ...state, loading: false };

    case "error":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error, userData, loading }, dispatch] =
    useReducer(reducer, initialState);

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
      dispatch({ type: "setUserData", payload: snapshot.val() });
    });
    return () => unsubscribe();
  }, [user]);

  const navigate = useNavigate();

  function login(email, password) {
    dispatch({ type: "loading" });
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
      })
      .finally(() => {
        dispatch({ type: "loaded" });
      });
  }

  function signup(email, password, name) {
    dispatch({ type: "loading" });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "signup", payload: user });

        // Adding user data to the Realtime DB
        const dbRef = `/users/${user.uid}/userdata`;
        update(ref(database, dbRef), {
          email: user.email,
          createdAt: new Date().toISOString(),
          name,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage;
        switch (errorCode) {
          case "auth/email-already-in-use":
            errorMessage = "This email is already registered.";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email.";
            break;
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters.";
            break;
          default:
            errorMessage = "Unable to sign up. Please try again.";
        }
        dispatch({ type: "error", payload: errorMessage });
      })
      .finally(() => {
        dispatch({ type: "loaded" });
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

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
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
        resetPassword,
        signup,
        error,
        dispatch,
        addUserDataToDb,
        userData,
        loading,
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
