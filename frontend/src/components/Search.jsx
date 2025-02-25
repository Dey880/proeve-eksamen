import { useEffect, useState } from "react";
import axios from "axios";
import "../css/components/Search.css"

export default function LandingPage() {
    const [animals, setAnimals] = useState([]);
    const [owners, setOwners] = useState({});
    const [herd, setHerd] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function GetAllAnimals() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/raindeer`, {
                    withCredentials: true,
                });
    
                const fetchedAnimals = response.data.raindeer || [];
                setAnimals(fetchedAnimals);
    
                fetchedAnimals.forEach((animal) => {
                    getOwner(animal.owner);
                    getHerd(animal.flokk);
                });
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.warn("No deer found in the database.");
                    setAnimals([]);
                } else {
                    console.error("Error fetching animals:", error);
                }
            }
        }
        GetAllAnimals();
    }, []);

    function getOwner(ownerId) {
        try {
            axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/auth/user/${ownerId}`, {
                withCredentials: true,
            })
            .then((response) => {
                setOwners((prevOwners) => ({
                    ...prevOwners,
                    [ownerId]: response.data.user.email,
                }));
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setOwners((prevOwners) => ({
                        ...prevOwners,
                        [ownerId]: "Ukjent Eier",
                    }));
                } else {
                    console.error("Error fetching owner:", error);
                }})
        } catch (error) {
            console.error(error);
        }
    }

    function getHerd(herdId) {
        try {
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/herd/${herdId}`, {
                    withCredentials: true,
                })
                .then((response) => {
                    const herdData = response.data.herd;
                    setHerd((prevHerd) => ({
                        ...prevHerd,
                        [herdId]: {
                            name: herdData.name,
                            imageUrl: herdData.buemerke_bilde
                                ? `${process.env.REACT_APP_UPLOAD_URL}${herdData.buemerke_bilde}`
                                : null,
                        },
                    }));
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        setHerd((prevHerd) => ({
                            ...prevHerd,
                            [herdId]: { name: "Ukjent flokk", imageUrl: null },
                        }));
                    } else {
                        console.error("Error fetching herd:", error);
                    }
                });
        } catch (error) {
            console.error(error);
        }
    }

    const filteredAnimals = animals.filter((animal) => {
        const ownerName = owners[animal.owner] || "";
        const herdName = herd[animal.flokk] || "";
        return (
            animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            animal.serialnumber.toString().includes(searchQuery) ||
            ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            herdName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="animals">
            <input type="text"
            placeholder="Søk fra Navn, Eier, Flokk eller Serienummer."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            />


    {filteredAnimals.length > 0 ? (
        filteredAnimals.map((animal) => (
            <div key={animal._id}>
                <h1>Navn: {animal.name}</h1>
                <h1>Eier: {owners[animal.owner] || "Ukjent Eier"}</h1>
                <h1>Serialnumber: {animal.serialnumber}</h1>
                <h1>Fødselsdato: {animal.dateofbirth}</h1>
                <h1>Flokk: {herd[animal.flokk]?.name || "Ukjent Flokk"}</h1>
                {herd[animal.flokk]?.imageUrl ? (
                    <div>
                        <h1>Bilde av buemerke:</h1>
                        <img
                            src={herd[animal.flokk]?.imageUrl}
                            alt="Buemerke"
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                        />
                    </div>
                ) : (
                    <p>Ingen bilde tilgjengelig</p>
                )}
            </div>
        ))
    ) : (
        <div>Ingen reinsdyr funnet</div>
    )}

        </div>
    );
}