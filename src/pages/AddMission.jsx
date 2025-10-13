import { useContext } from "react";
import styles from "./AddMission.module.css";

import { MissionContext } from "../contexts/MissionContext";
import PageHeader from "../components/PageHeader";
import Mission from "../components/Mission";
import Form from "../components/Form";
import { faMoneyBillTrendUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";

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
            <th></th>
            <th></th>
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
  const { formopen, setFormopen } = useContext(MissionContext);
  const { missions } = useContext(MissionContext);

  let total = 0;
  if (missions)
    total = Object.values(missions).reduce((acc, cur) => acc + cur.prix, 0);

  return (
    <div className={styles.page}>
      <PageHeader headerType="dark" />
      <main className={styles.mainContainer}>
        <div className={styles.formAssignmentContainer}>
          <div className={styles.btnDiv}>
            <div className={styles.earnings}>
              <FontAwesomeIcon
                icon={faMoneyBillTrendUp}
                className={styles.money}
              />
              Ce mois, tu as gagné {total}€
            </div>
            {!formopen && (
              <Button onClick={() => setFormopen(!formopen)}>
                <FontAwesomeIcon className={styles.plus} icon={faPlus} />
                Ajouter une mission
              </Button>
            )}
          </div>
          <div className={styles.formContainer}>{formopen && <Form />}</div>

          <MissionsSection />
        </div>
      </main>
    </div>
  );
}
