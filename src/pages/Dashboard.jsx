import styles from "./Dashboard.module.css";
import { useContext, useState } from "react";
import { MissionContext } from "../contexts/MissionContext";
import PageHeader from "../components/PageHeader";
import Mission from "../components/Mission";
import { faGauge, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";

export default function Dashboard() {
  const { missions } = useContext(MissionContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  let missionsToRender = [];

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
              Ce mois-ci, tu as gagné {total}€
            </div>
          </div>

          <MissionsSection
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
          />
        </div>
      </main>
    </div>
  );
}
