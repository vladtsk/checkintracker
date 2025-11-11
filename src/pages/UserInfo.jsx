import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageHeader from "../components/PageHeader";
import styles from "./UserInfo.module.css";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function UserInfo() {
  const { userData, addUserDataToDb } = useAuth();

  const [editOn, setEditOn] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [siret, setSiret] = useState("");
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPostCode, setClientPostCode] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientSiret, setClientSiret] = useState("");

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setSurname(userData.surname || "");
      setAddress(userData.address || "");
      setPostcode(userData.postcode || "");
      setCity(userData.city || "");
      setSiret(userData.siret || "");
      setIban(userData.iban || "");
      setBic(userData.bic || "");
      setClientName(userData.clientName || "");
      setClientAddress(userData.clientAddress || "");
      setClientPostCode(userData.clientPostCode || "");
      setClientCity(userData.clientCity || "");
      setClientSiret(userData.clientSiret || "");
    }
  }, [userData]);

  const maskedIban = iban ? iban.replace(/.(?=.{4})/g, "*") : "";

  function handleModify() {
    const userData = {
      name,
      surname,
      address,
      postcode,
      city,
      siret,
      iban,
      bic,
      clientName,
      clientAddress,
      clientPostCode,
      clientCity,
      clientSiret,
    };
    addUserDataToDb(userData);
    setEditOn(!editOn);
  }

  return (
    <div className={styles.page}>
      <PageHeader headerType="dark" />
      <main className={styles.mainContainer}>
        <div className={styles.tableContainer}>
          {editOn ? (
            <table>
              <tbody>
                <tr>
                  <td>Nom</td>
                  <td>
                    <input
                      id="surname"
                      type="text"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Prénom</td>
                  <td>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Adresse</td>
                  <td>
                    <input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Code Postal</td>
                  <td>
                    <input
                      id="postcode"
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Ville</td>
                  <td>
                    <input
                      id="ville"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Siret</td>
                  <td>
                    {" "}
                    <input
                      id="siret"
                      type="text"
                      value={siret}
                      onChange={(e) => setSiret(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>IBAN</td>
                  <td>
                    <input
                      id="iban"
                      type="text"
                      value={iban}
                      onChange={(e) => setIban(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>BIC</td>
                  <td>
                    <input
                      id="bic"
                      type="text"
                      value={bic}
                      onChange={(e) => setBic(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Nom du client</td>
                  <td>
                    <input
                      id="clientname"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Adresse du client</td>
                  <td>
                    <input
                      id="clientaddress"
                      type="text"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Code postal du client</td>
                  <td>
                    <input
                      id="clientpostcode"
                      type="text"
                      value={clientPostCode}
                      onChange={(e) => setClientPostCode(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Ville du client</td>
                  <td>
                    {" "}
                    <input
                      id="clientcity"
                      type="text"
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Siret du client</td>
                  <td>
                    <input
                      id="clientsiret"
                      type="text"
                      value={clientSiret}
                      onChange={(e) => setClientSiret(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table>
              <tbody>
                <tr>
                  <td>Nom *</td>
                  <td>{surname} </td>
                </tr>
                <tr>
                  <td>Prénom *</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Adresse *</td>
                  <td>{address} </td>
                </tr>
                <tr>
                  <td>Code Postal *</td>
                  <td>{postcode}</td>
                </tr>
                <tr>
                  <td>Ville *</td>
                  <td>{city}</td>
                </tr>
                <tr>
                  <td>Siret *</td>
                  <td>{siret}</td>
                </tr>
                <tr>
                  <td>IBAN</td>
                  <td>{maskedIban}</td>
                </tr>
                <tr>
                  <td>BIC</td>
                  <td>{bic}</td>
                </tr>
                <tr>
                  <td>Nom du client *</td>
                  <td>{clientName}</td>
                </tr>
                <tr>
                  <td>Adresse du client *</td>
                  <td>{clientAddress}</td>
                </tr>
                <tr>
                  <td>Code postal du client *</td>
                  <td>{clientPostCode}</td>
                </tr>
                <tr>
                  <td>Ville du client *</td>
                  <td>{clientCity}</td>
                </tr>
                <tr>
                  <td>Siret du client *</td>
                  <td>{clientSiret}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className={styles.btnDiv}>
          {!editOn ? (
            <Button type="plus" onClick={() => setEditOn(!editOn)}>
              Modifier
            </Button>
          ) : (
            <Button type="plus" onClick={handleModify}>
              Valider
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
