import { createContext, useState } from "react";

const MissionContext = createContext();

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

function MissionProvider({ children }) {
  const [missions, setMissions] = useState(initialMissions);

  function handleAddMission(newMission) {
    setMissions((missions) => [...missions, newMission]);
  }

  return (
    <MissionContext.Provider value={{ missions, handleAddMission }}>
      {children}
    </MissionContext.Provider>
  );
}

export { MissionProvider, MissionContext };
