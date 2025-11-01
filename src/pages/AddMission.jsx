import { useContext, useState } from "react";
import styles from "./AddMission.module.css";

import { MissionContext } from "../contexts/MissionContext";
import PageHeader from "../components/PageHeader";
import Mission from "../components/Mission";
import Form from "../components/Form";
import { faMoneyBillTrendUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import MissionPopup from "../components/MissionPopup";

function MissionsSection({
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}) {
  const { missions } = useContext(MissionContext);
  const [showMore, setShowMore] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  function handleClick(mission) {
    console.log("clicked", mission);
    setSelectedMission(mission);
    setShowPopup(!showPopup);
  }

  const navigate = useNavigate();

  let missionsToRender;

  if (missions) {
    // Access missions[selectedYear][selectedMonth]
    const yearData = missions[selectedYear];
    const monthData = yearData
      ? yearData[String(selectedMonth).padStart(2, "0")]
      : null;

    if (monthData) {
      const allMissions = Object.values(monthData);
      missionsToRender = showMore
        ? allMissions.reverse()
        : allMissions.reverse().slice(0, 5);
    }
  }
  /*
  if (missions && Object.values(missions).length > 0) {
    if (!showMore) {
      missionsToRender = Object.values(missions).reverse().slice(0, 5);
    } else {
      missionsToRender = Object.values(missions).reverse();
    }
  }
*/
  //const now = new Date();
  //const curYear = now.getFullYear();
  //const curMonth = String(now.getMonth() + 1).padStart(2, "0");

  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const selectedMonthName = monthNames[selectedMonth - 1];
  const prefix =
    selectedMonthName === "avril" ||
    selectedMonthName === "août" ||
    selectedMonthName === "octobre"
      ? "d'"
      : "de ";

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.assignmentsSection}>
      <h3>
        Missions {prefix}
        {selectedMonthName} {selectedYear}
      </h3>
      <div className={styles.monthNavigation}>
        <div className={styles.previous} onClick={handlePrevMonth}>
          ← Mois précédent
        </div>
        <div className={styles.next} onClick={handleNextMonth}>
          Mois suivant →
        </div>
      </div>
      <div className={styles.popupInfo}>
        {showPopup && <MissionPopup mission={selectedMission} setShowPopup={setShowPopup} />}
      </div>
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
          {missionsToRender ? (
            missionsToRender.map((m) => (
              <Mission
                mission={m}
                key={m.id}
                handleClick={() => handleClick(m)}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                Aucune mission ce mois-ci
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.voirPlusDiv}>
        <Button type="plus" onClick={() => setShowMore(!showMore)}>
          {!showMore ? "Voir plus" : "Voir moins"}
        </Button>{" "}
        <Button
          type="plus"
          onClick={() =>
            navigate(
              `/invoice?year=${selectedYear}&month=${String(
                selectedMonth
              ).padStart(2, "0")}`
            )
          }
        >
          Facture
        </Button>
      </div>
    </div>
  );
}

export default function AddMission() {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const { formopen, setFormopen } = useContext(MissionContext);
  const { missions } = useContext(MissionContext);

  let total = 0;
  /* if (missions)
    total = Object.values(missions).reduce((acc, cur) => acc + cur.prix, 0);*/
  if (missions) {
    const yearData = missions[selectedYear];
    const monthData = yearData
      ? yearData[String(selectedMonth).padStart(2, "0")]
      : null;

    if (monthData) {
      total = Object.values(monthData).reduce(
        (acc, cur) => acc + (cur.prix || 0),
        0
      );
    }
  }

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
            {!formopen && (
              <Button onClick={() => setFormopen(!formopen)}>
                <FontAwesomeIcon className={styles.plus} icon={faPlus} />
                Ajouter une mission
              </Button>
            )}
          </div>
          <div className={styles.formContainer}>{formopen && <Form />}</div>

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
