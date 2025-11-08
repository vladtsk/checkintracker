import React, { useContext } from "react";
import styles from "./InvoicePage.module.css";

import html2pdf from "html2pdf.js";
import Button from "../components/Button";

import { useAuth } from "../contexts/AuthContext";
import { MissionContext } from "../contexts/MissionContext";
import PageHeader from "../components/PageHeader";
import { useSearchParams } from "react-router-dom";

export default function InvoicePage() {
  const { userData } = useAuth();
  const { missions } = useContext(MissionContext);

  const [searchParams] = useSearchParams();
  const selectedYear =
    Number(searchParams.get("year")) || new Date().getFullYear();
  const selectedMonth = String(
    searchParams.get("month") || new Date().getMonth() + 1
  ).padStart(2, "0");

  //const now = new Date();

  let monthMissions = [];
  if (missions) {
    const yearData = missions[selectedYear];
    const monthData = yearData ? yearData[selectedMonth] : null;
    if (monthData) {
      monthMissions = Object.values(monthData);
    }
  }

  const missions12Count = monthMissions.filter((m) => m.prix === 12).length;
  const missions17Count = monthMissions.filter((m) => m.prix === 17).length;
  const missions20Count = monthMissions.filter((m) => m.prix === 20).length;

  const autres = monthMissions.filter(
    (m) => m.prix !== 12 && m.prix !== 17 && m.prix !== 20
  );
  //const autreCount = autres.length;
  const autreTotal = autres.reduce((acc, cur) => acc + cur.prix, 0);

  const total = monthMissions.reduce((acc, cur) => acc + cur.prix, 0);

  const depassement = monthMissions.find((m) => m.type === "forfait");
  const depassementAmount = depassement ? depassement.prix : 0;
  const items = [
    {
      description: "Prestations d'accueil et extras",
      quantity: missions12Count,
      unitPrice: 12,
    },
    {
      description:
        "Prestations d'accueil et extras (dimanches et jours fériés)",
      quantity: missions17Count,
      unitPrice: 17,
    },
    {
      description: "Prestations d'accueil et extras (de 21h à 23h)",
      quantity: missions20Count,
      unitPrice: 20,
    },
    {
      description: "Autres",
      quantity: 1,
      unitPrice: autreTotal,
    },
    {
      description: "Dépassement forfait mobile",
      quantity: 1,
      unitPrice: depassementAmount,
    },
  ];

  const handleDownload = () => {
    const element = document.getElementById("invoice");
    const options = {
      margin: 0.5,
      filename: "facture.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  /*const year = now.getFullYear();
  const month = String(now.getMonth()).padStart(2, "0");*/
  const invoiceNumber = `${selectedYear}${selectedMonth}01`;

  const monthNumber = Number(selectedMonth);
  //const newYear = selectedMonth === "12" ? selectedYear + 1 : selectedYear;

  const invoiceDate = new Date(selectedYear, monthNumber, 0); // last day of selected month
  const dueDate = new Date(selectedYear, monthNumber, 15); // 15th of next month

  const formatDate = (date) =>
    date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const invoiceDateStr = formatDate(invoiceDate);
  const dueDateStr = formatDate(dueDate);

  return (
    <div className={styles.invoicePage}>
      <PageHeader headerType="dark" />
      <div id="invoice" className={styles.invoice}>
        <h1 className={styles.title}>Facture N°{invoiceNumber}</h1>
        <header className={styles.header}>
          <div className={styles.sender}>
            <p className={styles.companyName}>
              {userData.surname} {userData.name}
            </p>
            <p>{userData.address}</p>
            <p>
              {userData.postcode}, {userData.city}
            </p>
            <p>
              <b>SIRET</b>: {userData.siret}
            </p>
          </div>

          <div className={styles.clientSection}>
            <div className={styles.client}>
              <p className={styles.clientName}>
                <strong>{userData.clientName}</strong>
              </p>
              <p>{userData.clientAddress}</p>
              <p>
                {userData.clientPostCode}, {userData.clientCity}
              </p>
              <p>
                <b>SIRET</b>: {userData.clientSiret}
              </p>
            </div>
          </div>
        </header>
        <section className={styles.section}>
          <div>
            <div className={styles.dateRow}>
              <span className={styles.dateLabel}>Date de facture</span>
              <span className={styles.dateValue}>{invoiceDateStr}</span>
            </div>
            <div className={styles.dateRow}>
              <span className={styles.dateLabel}>Echéance de paiement</span>
              <span className={styles.dateValue}>{dueDateStr}</span>
            </div>
          </div>
        </section>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.colDesc}>Description</th>
              <th className={styles.colQty}>Quantité</th>
              <th className={styles.colUnit}>Prix unitaire HT</th>
              <th className={styles.colTotal}>Prix total HT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td className={styles.colDesc}>{it.description}</td>
                <td className={styles.colQty}>{it.quantity}</td>
                <td className={styles.colUnit}>{it.unitPrice.toFixed(2)} €</td>
                <td className={styles.colTotal}>
                  {(it.quantity * it.unitPrice).toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.total}>
          <p className={styles.totalValue}>Total HT : {total.toFixed(2)} €</p>
        </div>

        <div className={styles.rib}>
          <p className={styles.ribTitle}>
            {userData?.surname?.toUpperCase()} {userData?.name?.toUpperCase()}
          </p>
          <p>IBAN : {userData?.iban}</p>
          <p>BIC : {userData?.bic}</p>
        </div>

        <div className={styles.legal}>
          <p>
            En cas de retard, une pénalité au taux annuel de 5 % sera appliquée,
            à laquelle s'ajoutera une indemnité forfaitaire pour frais de
            recouvrementde 40 €
          </p>
          <p>Aucun escompte consenti pour paiement anticipé</p>
          <p>TVA non applicable, article 293 B du CGI.</p>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button onClick={handleDownload} type="plus">
          Télécharger en PDF
        </Button>
      </div>
    </div>
  );
}
