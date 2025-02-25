import "../css/components/Form.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext.jsx";

export default function RegisterReinsdyr() {
    const { user } = useContext(AuthContext);
    const owner = user?._id;
    const [serialNumber, setSerialNumber] = useState("");
    const [name, setName] = useState("");
    const [flokk, setFlokk] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [herds, setHerds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState(null);
    
    useEffect(() => {
        const fetchHerds = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/herd`);
                if (Array.isArray(response.data.herds)) {
                    const userHerds = response.data.herds.filter((herd) => herd.owner === owner);
                    const sortedHerds = userHerds.sort((a, b) => a.owner.localeCompare(b.owner));
                    setHerds(sortedHerds);
                } else {
                    setMsg("Kunne ikke laste inn flokker");
                }
            } catch (err) {
                console.error(err);
                setMsg("Kunne ikke laste inn flokker");
            } finally {
                setLoading(false);
            }
        };
    
        fetchHerds();
    }, [owner]);

    function handleSubmit(e) {
        e.preventDefault();
        axios
        .post(
            `${process.env.REACT_APP_BACKEND_URL}/raindeer`,
            { owner, serialNumber, name, flokk, dateOfBirth },
            { withCredentials: true }
        )
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
                setMsg(error.response.data.msg);
            } else {
                setMsg("An error occurred. Please try again later.");
            }
        })
    }

    return (
        <div>
            <h1>Registrer Reinsdyr</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Serienummer"
                    onChange={(e) => setSerialNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Navn"
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="flokk">Velg flokk</label>
                {loading ? (
                    <p>Loading herds...</p>
                ) : msg ? (
                    <p>{msg}</p>
                ) : (
                    <select id="flokk" value={flokk} onChange={(e) => setFlokk(e.target.value)}>
                        <option value="">--Velg flokk--</option>
                        {herds.map((herd) => {
                            return (
                                <option key={herd._id} value={herd._id}>
                                    {herd.name}
                                </option>
                            );
                        })}
                    </select>
                )}
                <input type="date" onChange={(e) => setDateOfBirth(e.target.value)} />
                <button type="submit">Registrer</button>
            </form>
        </div>
    );
}