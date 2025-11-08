import styles from "./Mission.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { MissionContext } from "../contexts/MissionContext";
import DatePicker from "react-datepicker";

export default function Mission({ mission, handleClick }) {
  /*  const { setEditMissionId, updateMission } = useContext(MissionContext);

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
    setDate(new Date(mission.date));

    setEditMissionId(editId);
  }

  function handleValidate() {
    if (nomAppart === "") {
      setEditMissionId(null);
      return;
    }

    const editedMission = {
      //id: mission.id,
      type: missionType,
      appartement: nomAppart,
      prix: Number(price),
      commentaire: "",
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
    setEditMissionId(null);
  }*/

  return (
    <tr className={styles.mission}>
      <td onClick={handleClick} className={styles.apart}>
        {mission.appartement}
      </td>
      <td>{mission.type}</td>
      <td>{mission.prix}</td>
      <td>{new Date(mission.date).toLocaleDateString("fr-FR")}</td>
      <td className={styles.comment}>{mission.commentaire}</td>
    </tr>
  );
}
