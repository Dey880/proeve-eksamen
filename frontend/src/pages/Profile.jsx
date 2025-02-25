import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Profile() {
    const { user } = useContext(AuthContext);

    if (!user) return <div>Er du sikker på at du er logget inn?</div>;

    return (
        <div>
            <h1>Profil</h1>
            <p>Velkommen, {user.name}!</p>
            <a href="/regrein">Registrer Reinsdyr</a>
            <a href="/regflokk">Registrer flokk</a>
        </div>
    );
}