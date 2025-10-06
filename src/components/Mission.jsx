import {
  faPenToSquare,
  faSquareCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Mission.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { MissionContext } from "../contexts/MissionContext";
import DatePicker from "react-datepicker";

export default function Mission({ mission }) {
  const { handleDelete, editMissionId, setEditMissionId, updateMission } =
    useContext(MissionContext);

  const [missionType, setMissionType] = useState("accueil");
  const [nomAppart, setNomAppart] = useState("");
  const [price, setPrice] = useState(12);
  const [date, setDate] = useState(new Date());
  //const [comment, setComment] = useState("");

  function handleEdit(editId) {
    if (mission.id !== editId) return;
    setMissionType(mission.type);
    setNomAppart(mission.appartement);
    setPrice(mission.prix);
    setDate(mission.date);

    setEditMissionId(editId);
  }

  function handleValidate() {
    const editedMission = {
      id: mission.id,
      type: missionType,
      appartement: nomAppart,
      prix: price,
      commentaire: "",
      date,
    };

    updateMission(mission.id, editedMission);
    setEditMissionId(null);
  }

  return (
    <>
      {editMissionId == mission.id ? (
        <tr className={styles.missionEdit}>
          <td>
            <input
              id="appart"
              type="text"
              value={nomAppart}
              onChange={(e) => setNomAppart(e.target.value)}
            />
          </td>
          <td>
            <select
              id="typeMission"
              value={missionType}
              onChange={(e) => setMissionType(e.target.value)}
            >
              <option value="accueil">accueil</option>
              <option value="mission">mission</option>
            </select>
          </td>
          <td>
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
          </td>
          <td>
            <DatePicker
              id="dateSelect"
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="dd/MM/yyyy"
            />
          </td>
          <td>
            <FontAwesomeIcon
              className={styles.checkBtn}
              icon={faSquareCheck}
              onClick={() => handleValidate(mission.id)}
            />
          </td>
          <td>
            <FontAwesomeIcon
              className={styles.deleteBtn}
              icon={faTrash}
              onClick={() => handleDelete(mission.id)}
            />
          </td>
        </tr>
      ) : (
        <tr className={styles.mission}>
          <td>{mission.appartement}</td>
          <td>{mission.type}</td>
          <td>{mission.prix}</td>
          <td>{new Date(mission.date).toLocaleDateString("fr-FR")}</td>
          <td>
            <FontAwesomeIcon
              className={styles.editBtn}
              icon={faPenToSquare}
              onClick={() => handleEdit(mission.id)}
            />
          </td>
          <td>
            <FontAwesomeIcon
              className={styles.deleteBtn}
              icon={faTrash}
              onClick={() => handleDelete(mission.id)}
            />
          </td>
        </tr>
      )}
    </>
  );
}
