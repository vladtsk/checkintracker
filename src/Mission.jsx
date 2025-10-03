import "./Mission.css";

export default function Mission({ mission }) {
  console.log(typeof mission.date);
  return (
    <tr className="mission">
      <td>{mission.appartement}</td>
      <td>{mission.type}</td>
      <td>{mission.prix}</td>
      <td>{mission.date}</td>
    </tr>
  );
}
