import { useContext } from "react";
import "./AddMission.css";
import SideMenu from "../components/SideMenu";
import { MissionContext } from "../contexts/MissionContext";
import PageHeader from "../components/PageHeader";
import Mission from "../components/Mission";
import Form from "../components/Form";

function AssignmentsSection() {
  const { missions } = useContext(MissionContext);

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

export default function AddMission() {
  return (
    <>
      <PageHeader />
      <main className="mainContainer">
        <SideMenu />
        <div className="formAssignmentContainer">
          <div className="formContainer">
            <Form />
          </div>
          <AssignmentsSection />
        </div>
      </main>
    </>
  );
}
