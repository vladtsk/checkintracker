import { useContext } from "react";
import styles from "./AddMission.module.css";
import SideMenu from "../components/SideMenu";
import { MissionContext } from "../contexts/MissionContext";
import PageHeader from "../components/PageHeader";
import Mission from "../components/Mission";
import Form from "../components/Form";

function MissionsSection() {
  const { missions } = useContext(MissionContext);

  return (
    <div className={styles.assignmentsSection}>
      <h3>Liste de missions</h3>
      <table>
        <thead>
          <tr>
            <th>Appartement</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {missions && Object.values(missions.length > 0) ? (
            Object.values(missions).map((m) => (
              <Mission mission={m} key={m.id} />
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                Aucune mission ce mois-ci
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AddMission() {
  return (
    <div className={styles.page}>
      <main className={styles.mainContainer}>
        <PageHeader />

        <div className={styles.formAssignmentContainer}>
          <div className={styles.formContainer}>
            <Form />
          </div>
          <MissionsSection />
        </div>
      </main>
    </div>
  );
}
