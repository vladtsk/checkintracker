import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { MissionContext } from "../contexts/MissionContext";
import PageHeader from "../components/PageHeader";
import Mission from "../components/Mission";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export default function Dashboard() {
  /*const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());*/
  //let missionsToRender = [];

  const [allMissions, setAllMissions] = useState({});

  useEffect(() => {
    const dbRef = ref(database, "/users");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const usersData = snapshot.val();
      const missions = {};

      if (usersData) {
        Object.entries(usersData).forEach(([userId, userData]) => {
          if (userData.missions) {
            missions[userId] = userData.missions;
          }
        });
      }

      setAllMissions(missions);
      console.log("All users' missions:", missions);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.page}>
      <PageHeader headerType="dark" />
      <main className={styles.mainContainer}>
        <div className={styles.formAssignmentContainer}>
          <h2>All Users’ Missions</h2>
          {Object.entries(allMissions).map(([userId, missions]) => (
            <div key={userId}>
              <h3>User: {userId}</h3>
              <pre>{JSON.stringify(missions, null, 2)}</pre>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
