import { useContext, useState } from "react";

import styles from "./Form.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faTag,
  faCoins,
  faCalendarDays,
  faSquarePen,
} from "@fortawesome/free-solid-svg-icons";
import { MissionContext } from "../contexts/MissionContext";
import Button from "./Button";

export default function Form() {
  const [missionType, setMissionType] = useState("accueil");
  const [nomAppart, setNomAppart] = useState("");
  const [price, setPrice] = useState(12);
  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState("");
  const { handleAddMission: onAddMission } = useContext(MissionContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (nomAppart == "") return;

    const newMission = {
      id: Date.now(),
      type: missionType,
      appartement: nomAppart,
      prix: price,
      commentaire: comment,
      date: date.toISOString(),
    };

    onAddMission(newMission);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une mission</h2>

      <div className={styles.formField}>
        <label htmlFor="appart">
          <FontAwesomeIcon icon={faBuilding} /> Appartement
        </label>

        <input
          id="appart"
          type="text"
          value={nomAppart}
          onChange={(e) => setNomAppart(e.target.value)}
        />
      </div>

      <div className={styles.typePrixSection}>
        <div className={styles.formField}>
          <label htmlFor="typeMission">
            <FontAwesomeIcon icon={faTag} /> Type de mission
          </label>

          <select
            id="typeMission"
            value={missionType}
            onChange={(e) => setMissionType(e.target.value)}
          >
            <option value="accueil">accueil</option>
            <option value="mission">mission</option>
          </select>
        </div>

        <div className={styles.formField}>
          <label htmlFor="priceSelect">
            <FontAwesomeIcon icon={faCoins} /> Prix
          </label>
          <select
            id="priceSelect"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          >
            <option value={12}>12€</option>
            <option value={15}>15€</option>
            <option value={17}>17€</option>
            <option value={20}>20€</option>
            <option value={24}>24€</option>
          </select>
        </div>
      </div>

      <div className={styles.formField}>
        <label htmlFor="dateSelect">
          <FontAwesomeIcon icon={faCalendarDays} /> Date
        </label>
        <DatePicker
          id="dateSelect"
          selected={date}
          onChange={(d) => setDate(d)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="comment">
          <FontAwesomeIcon icon={faSquarePen} /> Commentaire
        </label>
        <input
          id="comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button type="dark">{"Submit"}</Button>
    </form>
  );
}
