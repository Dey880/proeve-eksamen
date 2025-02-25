import "../css/components/Form.css";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext.jsx";
import { useLocation } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirected = queryParams.get("redirected") === "true";

    if (user) window.location.replace("/profile");

    function handleSubmit(e) {
        e.preventDefault();
        axios
        .post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
            { email, password },
            { withCredentials: true }
        )
        .then((response) => {
            setMsg(response.data.msg);
            setTimeout(() => {
            if (response.status === 202) {
                window.location.replace("/profile");
            }
            }, 1000);
        })
        .catch((error) => {
            if (error.response) {
            setMsg(error.response.data.msg);
            } else {
            setMsg("An error occurred. Please try again later.");
            }
        });
    }

    return (
        <div>
        {redirected && (
            <div className="redirect-message">
            Du må logge inn for å se denne siden.
            </div>
        )}
        <h1>Logg inn</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Epost"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <input
            type="password"
            placeholder="Passord"
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Logg inn</button>
        </form>
        {msg && (
            <div className="message">
            <p>{msg}</p>
            </div>
        )}
        </div>
    );
}