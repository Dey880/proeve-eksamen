import "../css/components/Form.css"
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [language, setLanguage] = useState("norsk");
    const [phone, setPhone] = useState("");
    const [msg, setMsg] = useState("");
    const { user } = useContext(AuthContext);

        if (user) window.location.replace("/profile");

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
            { name, email, password, repeatPassword, language, phone },
            { withCredentials: true }
        )
        .then((response) => {
            setMsg(response.data.msg);
            setTimeout(() => {
                if (response.status === 201) {
                    window.location.replace("/profile");
                }
            }, 1000);
        })
    }

    return (
        <div>
            <h1>Registrer bruker</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Navn" onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Epost" onChange={(e) => setEmail(e.target.value.toLowerCase())}/>
                <input type="password" placeholder="Passord" onChange={(e) => setPassword(e.target.value)}/> 
                <input type="password" placeholder="Skriv passord igjenn" onChange={(e) => setRepeatPassword(e.target.value)}/>
                <div className="select-div">
                    <label htmlFor="language">Velg kontaktspråk:</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value='norsk'>Norsk</option>
                        <option value="kildinsamisk">Kildinsamisk</option>
                        <option value="skoltesamisk/østsamisk">Skoltesamisk / Østsamisk</option>
                        <option value="enaresamisk">Enaresamisk</option>
                        <option value="nordsamisk">Nordsamisk</option>
                        <option value="lulesamisk">Lulesamisk</option>
                        <option value="pitesamisk">Pitesamisk</option>
                        <option value="umesamisk">Umesamisk</option>
                        <option value="sørsamisk">Sørsamisk</option>
                    </select>
                </div>
                <input type="text" placeholder="Telefonnummer" onChange={(e) => setPhone(e.target.value)} />
                <button type="submit">Registrer</button>
            </form>
            {msg ? 
            <div><p>{msg}</p></div>
            :
            <div></div>
            }
        </div>
    )
}
