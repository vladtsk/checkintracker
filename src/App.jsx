import { useState } from "react";
import "./App.css";
import Form from "./Form";
import Mission from "./Mission";
import SideMenu from "./SideMenu";

const initialMissions = [
  {
    id: 1,
    type: "accueil",
    appartement: "Peak",
    prix: 12,
    commentaire: "",
    date: "03/10/2025",
  },
  {
    id: 2,
    type: "accueil",
    appartement: "Ricci",
    prix: 12,
    commentaire: "",
    date: "03/10/2025",
  },
  {
    id: 3,
    type: "mission",
    appartement: "Opéra Muse",
    prix: 20,
    commentaire: "21h",
    date: "04/10/2025",
  },
];

function App() {
  const [missions, setMissions] = useState(initialMissions);

  function handleAddMission(newMission) {
    setMissions((missions) => [...missions, newMission]);
  }

  return (
    <>
      <div>
        <PageHeader />
        <div className="mainContainer">
          <SideMenu />
          <div className="formAssignmentContainer">
            <FormSection handleAddMission={handleAddMission} />
            <AssignmentsSection missions={missions} />
          </div>
        </div>
      </div>
    </>
  );
}

function PageHeader() {
  return <div className="pageHeader">CheckInTracker</div>;
}

function FormSection({ handleAddMission }) {
  return (
    <div className="formContainer">
      <Form onAddMission={handleAddMission} />
    </div>
  );
}

function AssignmentsSection({ missions }) {
  return (
    <div className="assignmentsSection">
      <h3>Liste de missions</h3>
      <table>
        <thead>
          <tr>
            <th>Appartement</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((m) => (
            <Mission mission={m} key={m.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
