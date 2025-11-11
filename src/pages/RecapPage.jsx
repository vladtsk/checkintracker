import PageHeader from "../components/PageHeader";

import html2pdf from "html2pdf.js";
import styles from "./RecapPage.module.css";
import Mission from "../components/Mission";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { MissionContext } from "../contexts/MissionContext";

export default function RecapPage() {
  const { missions } = useContext(MissionContext);

  const [searchParams] = useSearchParams();
  const selectedYear =
    Number(searchParams.get("year")) || new Date().getFullYear();
  const selectedMonth = String(
    searchParams.get("month") || new Date().getMonth() + 1
  ).padStart(2, "0");

  let monthMissions = [];
  if (missions) {
    const yearData = missions[selectedYear];
    const monthData = yearData ? yearData[selectedMonth] : null;
    if (monthData) {
      monthMissions = Object.values(monthData);
    }
  }

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

  const handleDownload = () => {
    const element = document.getElementById("recap");
    const options = {
      margin: 10,
      filename: "recap.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className={styles.page}>
      <PageHeader headerType="dark" />
      <main className={styles.mainContainer}>
        <div className={styles.assignmentsSection}>
          <div id="recap" className={styles.recapContainer}>
            <h2>
              Récapitulatif des missions {prefix}
              {selectedMonthName} {selectedYear}
            </h2>

            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Appartement</th>
                    <th>Type</th>
                    <th>Prix</th>
                    <th>Date</th>
                    <th>Commentaire</th>
                  </tr>
                </thead>
                <tbody>
                  {monthMissions.length !== 0 ? (
                    monthMissions.map((m) => (
                      <Mission mission={m} key={m.id} type="recap" />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
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
            </div>
          </div>
          {monthMissions.length !== 0 && (
            <div className={styles.buttonDiv}>
              <Button type="plus" onClick={() => handleDownload()}>
                Télécharger
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
