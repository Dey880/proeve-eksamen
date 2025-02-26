import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import "../css/pages/Profile.css";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [herds, setHerds] = useState([]);

    useEffect(() => {
        if (user) {
            async function fetchHerds() {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/herd`, {
                        withCredentials: true,
                    });
                    const userHerds = response.data.herds.filter(herd => herd.owner === user._id);
                    setHerds(userHerds);
                } catch (error) {
                    console.error("Error fetching herds:", error);
                }
            }
            fetchHerds();
        }
    }, [user]);

    if (!user) return <div>Er du sikker på at du er logget inn?</div>;

async function handleLogout() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
            withCredentials: true,
        })
        if (response.status === 200) {
            window.location.replace("/");
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
}

    
    return (
        <div>
            <h1>Profil</h1>
            <p>Velkommen, {user.name}!</p>
            <button onClick={handleLogout}>Logg ut</button>
            <div>
                <button><a href="/regrein">Registrer Reinsdyr</a></button>
                <button><a href="/regflokk">Registrer flokk</a></button>
            </div>

            <div className="herd-container">
                <h1>Dine flokker</h1>
                {herds.length > 0 ? (
                    herds.map((herd) => (
                        <div key={herd._id}>
                            <a href={`/flokk/${herd._id}`}>
                                <div className="herd">
                                    <h2>Navn: {herd.name}</h2>
                                    <h3>Serienummer: {herd.serieinndeling}</h3>
                                    <h3>Område: {herd.area}</h3>
                                </div>
                            </a>
                            <button onClick={() => handleEditHerd(herd)}>Rediger</button>
                        </div>
                    ))
                ) : (
                    <div>Du har ingen flokker registrert.</div>
                )}
            </div>
        </div>
    );

    function handleEditHerd(herd) {
        window.location.href = `/redflokk/${herd._id}`;
    }
}