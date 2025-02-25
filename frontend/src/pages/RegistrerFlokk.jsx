import "../css/components/Form.css";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext.jsx";

export default function RegistrerFlokk() {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [serieInndeling, setSerieInndeling] = useState("");
    const [buemerkeNavn, setBuemerkeNavn] = useState("");
    const [buemerkeBilde, setBuemerkeBilde] = useState(null);
    const [area, setArea] = useState("");
    const [msg, setMsg] = useState(null);
    const owner = user?._id;

    function handleSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("owner", owner);
        formData.append("name", name);
        formData.append("serieinndeling", serieInndeling);
        formData.append("buemerke_navn", buemerkeNavn);
        if (buemerkeBilde) {
            formData.append("buemerke_bilde", buemerkeBilde[0]);
        }
        formData.append("area", area);
    
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/herd`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            })
            .then((response) => {
                setMsg(response.data.msg);
                setTimeout(() => {
                    if (response.status === 201) {
                        window.location.replace("/");
                    }
                }, 2000);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 500) {
                    setMsg("Sjekk at formen er riktig fylt ut og prøv igjen.");
                    }
                } else {
                    setMsg("En feil oppstod. Prøv igjen senere.");
                }
            });
    }
    
    return (
        <div>
            <h1>Registrer Flokk</h1>
            {msg && <p>{msg}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Navn" onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="SerieInndeling" onChange={(e) => setSerieInndeling(e.target.value)} />
                <input type="text" placeholder="Navn på buemerke" onChange={(e) => setBuemerkeNavn(e.target.value)} />
                <input type="file" onChange={(e) => setBuemerkeBilde(e.target.files)} />
                <label htmlFor="area">Velg primært beiteområdet</label>
                <select id="area" onChange={(e) => setArea(e.target.value)}>
                    <option value="">--Velg primært beiteområdet--</option>
                    <option value="Nord-Troms">Nord-Troms</option>
                    <option value="Sør-Troms">Sør-Troms</option>
                    <option value="Setesdal">Setesdal</option>
                    <option value="Hardangervidda">Hardangervidda</option>
                    <option value="Sørlandet">Sørlandet</option>
                    <option value="Røros">Røros</option>
                    <option value="Tydal">Tydal</option>
                    <option value="Kautokeino">Kautokeino</option>
                    <option value="Finnmarksvidda">Finnmarksvidda</option>
                    <option value="Helgeland">Helgeland</option>
                    <option value="Saltfjellet">Saltfjellet</option>
                    <option value="Lofoten">Lofoten</option>
                </select>
                <button type="submit">Registrer</button>
            </form>
        </div>
    );
}
