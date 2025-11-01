import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MissionPopup.module.css";
import {
  faCross,
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { MissionContext } from "../contexts/MissionContext";
import { set } from "firebase/database";

export default function MissionPopup({ mission, setShowPopup }) {
  const { handleDelete, editMissionId, setEditMissionId, updateMission } =
    useContext(MissionContext);

  const [missionType, setMissionType] = useState(mission.type);
  const [nomAppart, setNomAppart] = useState(mission.appartement);
  const [price, setPrice] = useState(mission.prix);
  const [date, setDate] = useState(new Date(mission.date));
  const [comment, setComment] = useState(mission.commentaire);
  const [editOn, setEditOn] = useState(false);

  function handleEdit() {
    //if (mission.id !== editId) return;
    setEditOn(true);
    setMissionType(mission.type);
    setNomAppart(mission.appartement);
    setPrice(mission.prix);
    setDate(new Date(mission.date));

    //setEditMissionId(editId);
  }

  function handleValidate() {
    if (nomAppart === "") {
      //setEditMissionId(null);
      return;
    }

    const editedMission = {
      //id: mission.id,
      type: missionType,
      appartement: nomAppart,
      prix: Number(price),
      commentaire: comment,
      date: date.toISOString(),
    };

    const originalDate = new Date(mission.date);
    const originalMonth = originalDate.getMonth();
    const originalYear = originalDate.getFullYear();

    const newMonth = date.getMonth();
    const newYear = date.getFullYear();

    if (originalMonth !== newMonth || originalYear !== newYear) {
      alert(
        "Vous ne pouvez pas changer le mois d'une mission. Veuillez supprimer cette mission et en créer une autre."
      );
      return;
    }

    updateMission(mission.id, editedMission);
    setEditOn(false);
    setShowPopup(false);
    //setEditMissionId(null);
  }

  return editOn ? (
    <div className={styles.backdrop} onClick={() => setShowPopup(false)}>
      <div className={styles.mission} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Modifier la mission</h3>
          <p>
            <FontAwesomeIcon
              className={styles.closeBtn}
              icon={faXmark}
              onClick={() => setShowPopup(false)}
            />
          </p>
        </div>
        <div className={styles.details}>
          <div className={styles.formField}>
            <label>Appartement</label>
            <input
              type="text"
              value={nomAppart}
              onChange={(e) => setNomAppart(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label>Type de mission</label>
            <select
              value={missionType}
              onChange={(e) => setMissionType(e.target.value)}
            >
              <option value="accueil">accueil</option>
              <option value="mission">mission</option>
              <option value="forfait">forfait mobile</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label>Tarif (€)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label>Date</label>
            <input
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>
          <div className={styles.formField}>
            <label>Commentaire</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className={styles.actions}>
            <button
              className={styles.validateBtn}
              onClick={() => handleValidate(mission.id)}
            >
              Valider
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => {
                setEditOn(false);
                setShowPopup(false);
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.backdrop} onClick={() => setShowPopup(false)}>
      <div className={styles.mission} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Détails de la mission</h3>
          <p>
            <FontAwesomeIcon
              className={styles.closeBtn}
              icon={faXmark}
              onClick={() => setShowPopup(false)}
            />
          </p>
        </div>

        <div className={styles.details}>
          <p>
            <strong>Appartement :</strong> {mission.appartement}
          </p>
          <p>
            <strong>Type de mission :</strong> {mission.type}
          </p>
          <p>
            <strong>Tarif :</strong> {mission.prix} €
          </p>
          <p>
            <strong>Date :</strong>{" "}
            {new Date(mission.date).toLocaleDateString("fr-FR")}
          </p>
          <p>
            <strong>Commentaire :</strong>{" "}
            {mission.commentaire ? mission.commentaire : "Aucun"}
          </p>
        </div>

        <div className={styles.actions}>
          <FontAwesomeIcon
            className={styles.editBtn}
            icon={faPenToSquare}
            onClick={() => handleEdit()}
          />
          <FontAwesomeIcon
            className={styles.deleteBtn}
            icon={faTrash}
            onClick={() => {
              handleDelete(mission.id, mission.date);
              setShowPopup(false);
              setEditOn(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
