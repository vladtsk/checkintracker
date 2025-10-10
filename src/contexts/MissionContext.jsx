import { useState, createContext, useEffect } from "react";
import {
  database,
  ref,
  set,
  onValue,
  push,
} from "../../firebase/firebaseConfig";
import { useAuth } from "./AuthContext";

const MissionContext = createContext();
/*
const initialMissions = {
  2025: {
    10: {
      "01": {
        id1: {
          type: "accueil",
          appartement: "Peak",
          prix: 12,
          commentaire: "",
          date: "01/10/2025",
        },
        id2: {
          type: "accueil",
          appartement: "House",
          prix: 12,
          commentaire: "",
          date: "01/10/2025",
        },
      },

      "02": {
        id3: {
          type: "accueil",
          appartement: "Ricci",
          prix: 12,
          commentaire: "",
          date: "03/10/2025",
        },
        id4: {
          type: "mission",
          appartement: "Opéra Muse",
          prix: 20,
          commentaire: "21h",
          date: "04/10/2025",
        },
      },
    },
  },
};*/

function MissionProvider({ children }) {
  const [missions, setMissions] = useState("");
  const [editMissionId, setEditMissionId] = useState(null);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  function writeData(userId, data) {
    const dbRef = `/users/${userId}/missions/${year}/${month}`;
    push(ref(database, dbRef), data);
  }

  /*function readData(userId, year, month) {
    let missions;*/

  const { user } = useAuth();
  let userId;
  if (user && user.uid) {
    userId = user.uid;
    console.log(userId);
  }

  useEffect(() => {
    const dbRef = `/users/${userId}/missions/${year}/${month}`;
    const unsubscribe = onValue(ref(database, dbRef), (snapshot) => {
      console.log("effect", userId);
      console.log(snapshot.val());
      if (snapshot.val()) setMissions(snapshot.val());
    });

    return () => unsubscribe();
  }, [userId, year, month]);

  function handleAddMission(newMission) {
    /*setMissions((missions) => {
      const upd = [...missions, newMission];
      writeData(userId, upd);
      return upd;
    });*/

    writeData(userId, newMission);
  }

  function handleDelete(missionId) {
    setMissions((missions) => missions.filter((m) => m.id !== missionId));
  }

  function updateMission(id, updatedM) {
    setMissions((missions) =>
      missions.map((mission) => (mission.id == id ? updatedM : mission))
    );
  }

  return (
    <MissionContext.Provider
      value={{
        missions,
        handleAddMission,
        handleDelete,
        setEditMissionId,
        editMissionId,
        updateMission,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export { MissionProvider, MissionContext };
