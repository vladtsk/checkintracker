import { useState } from "react";
import "./Form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Form({ onAddMission }) {
  const [missionType, setMissionType] = useState("accueil");
  const [nomAppart, setNomAppart] = useState("");
  const [price, setPrice] = useState(12);
  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (nomAppart == "") return;

    const newAssignment = {
      id: Date.now(),
      type: missionType,
      appartement: nomAppart,
      prix: price,
      commentaire: comment,
      date: date.toLocaleDateString("fr-FR"),
    };

    onAddMission(newAssignment);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une mission</h2>

      <div className="formField">
        <label htmlFor="appart">Appartement</label>
        <input
          id="appart"
          type="text"
          value={nomAppart}
          onChange={(e) => setNomAppart(e.target.value)}
        />
      </div>

      <div className="typePrixSection">
        <div className="formField">
          <label htmlFor="typeMission">Type de mission</label>
          <select
            id="typeMission"
            value={missionType}
            onChange={(e) => setMissionType(e.target.value)}
          >
            <option value="accueil">accueil</option>
            <option value="mission">mission</option>
          </select>
        </div>

        <div className="formField">
          <label htmlFor="priceSelect">Prix</label>
          <select
            id="priceSelect"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          >
            <option value={12}>12</option>
            <option value={15}>15</option>
            <option value={17}>17</option>
            <option value={20}>20</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      <div className="formField">
        <label htmlFor="dateSelect">Date</label>
        <DatePicker
          id="dateSelect"
          selected={date}
          onChange={(d) => setDate(d)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="formField">
        <label htmlFor="comment">Commentaire</label>
        <input
          id="comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button className="button">Submit</button>
    </form>
  );
}
