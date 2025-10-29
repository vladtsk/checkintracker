import React, { useContext } from "react";
import styles from "./InvoicePage.module.css";

import html2pdf from "html2pdf.js";
import Button from "../components/Button";

import { useAuth } from "../contexts/AuthContext";
import { MissionContext } from "../contexts/MissionContext";

export default function InvoicePage() {
  const { userData } = useAuth();
  const { missions } = useContext(MissionContext);
  console.log(missions);
  const missions12Count = Object.values(missions).filter(
    (m) => m.prix === 12
  ).length;
  const missions17Count = Object.values(missions).filter(
    (m) => m.prix === 17
  ).length;
  const missions20Count = Object.values(missions).filter(
    (m) => m.prix === 20
  ).length;

  const autres = Object.values(missions).filter(
    (m) => m.prix !== 12 && m.prix !== 17 && m.prix !== 20
  );
  const autreCount = autres.length;
  const autreTotal = autres.reduce((acc, cur) => acc + cur.prix, 0);

  const total = Object.values(missions).reduce((acc, cur) => acc + cur.prix, 0);

  const depassement = Object.values(missions).find((m) => m.type === "forfait");
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
  console.log(missions12Count, missions17Count, missions20Count, autreCount);

  const testInvoice = {
    id: "2025****",
    name: "John Doe",
    surname: "Doe",
    address: "123 Rue Exemple",
    postcode: "75001",
    city: "Paris",
    siret: "12345678901234",
    date: "28/10/2025",
    dueDate: "28/11/2025",
    items: [
      { description: "Produit A", quantity: 2, unitPrice: 50 },
      { description: "Produit B", quantity: 1, unitPrice: 100 },
    ],
    total: 200,
  };

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

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const invoiceNumber = `${year}${month}01`;

  const invoiceDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const dueDate = new Date(now.getFullYear(), now.getMonth() + 1, 15);

  const formatDate = (date) =>
    date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const invoiceDateStr = formatDate(invoiceDate);
  const dueDateStr = formatDate(dueDate);

  return (
    <div className={styles.page}>
      <div id="invoice">
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
            <p>{userData.siret}</p>
          </div>

          <div className={styles.clientSection}>
            <div className={styles.client}>
              <p className={styles.clientName}>
                <strong>{userData.clientName}</strong>
              </p>
              <p>{userData.clientAddress}</p>
              <p>
                {userData.postcode}, {userData.clientCity}
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

        <div className={styles.totalRow}>
          <div></div>
          <div className={styles.totalLabel}>Total HT :</div>
          <div className={styles.totalValue}>{total.toFixed(2)} €</div>
        </div>
      </div>

      <Button onClick={handleDownload} type="plus">
        Télécharger en PDF
      </Button>
    </div>
  );
}
