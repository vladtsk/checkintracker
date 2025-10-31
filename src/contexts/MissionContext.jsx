import { useState, createContext, useEffect } from "react";
import {
  database,
  ref,
  update,
  onValue,
  push,
  remove,
} from "../../firebase/firebaseConfig";
import { useAuth } from "./AuthContext";

const MissionContext = createContext();

function MissionProvider({ children }) {
  const [missions, setMissions] = useState("");
  const [editMissionId, setEditMissionId] = useState(null);
  const [formopen, setFormopen] = useState(false);

  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = String(now.getMonth() + 1).padStart(2, "0");

  function addData(userId, data) {
    const date = new Date(data.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const dbRef = `/users/${userId}/missions/${year}/${month}`;
    const dbMission = push(ref(database, dbRef), data);
    const dbMissionId = dbMission.key;

    const missionRef = `/users/${userId}/missions/${year}/${month}/${dbMissionId}`;
    update(ref(database, missionRef), { dbMissionId });
  }

  /*function readData(userId, year, month) {
    let missions;*/

  const { user } = useAuth();
  let userId;
  if (user && user.uid) {
    userId = user.uid;
  }

  useEffect(() => {
    /*const dbRef = `/users/${userId}/missions/${curYear}/${curMonth}`;*/
    const dbRef = `/users/${userId}/missions`;
    const unsubscribe = onValue(ref(database, dbRef), (snapshot) => {
      console.log("all missions", snapshot.val());
      setMissions(snapshot.val());
    });

    return () => unsubscribe();
  }, [userId, curYear, curMonth]);

  function handleAddMission(newMission) {
    addData(userId, newMission);
  }

  function handleDelete(id) {
    const confirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette mission ?"
    );
    if (!confirm) return;

    if (!missions || !userId) return;
    //setMissions((missions) => missions.filter((m) => m.id !== missionId));

    Object.values(missions).forEach((mission) => {
      const date = new Date(mission.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");

      if (mission.id == id) {
        console.log(mission);
        console.log(
          `/users/${userId}/missions/${year}/${month}/${mission.dbMissionId}`
        );
        const missionRef = `/users/${userId}/missions/${year}/${month}/${mission.dbMissionId}`;
        remove(ref(database, missionRef));
      }
    });
  }

  function updateMission(id, updatedM) {
    /*setMissions((missions) =>
      missions.map((mission) => (mission.id == id ? updatedM : mission))
    );*/

    const date = new Date(updatedM.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    missions &&
      Object.values(missions).map((mission) => {
        if (mission.id == id) {
          const missionRef = `/users/${userId}/missions/${year}/${month}/${mission.dbMissionId}`;
          update(ref(database, missionRef), { ...updatedM });
        }
      });
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
        formopen,
        setFormopen,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export { MissionProvider, MissionContext };
