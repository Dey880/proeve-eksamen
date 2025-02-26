import { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";

export default function FlokkPage() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const location = useLocation();
    const [herdDeer, setHerdDeer] = useState([]);
    const [herd, setHerd] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deerPerPage, setDeerPerPage] = useState(10);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const queryDeerPerPage = urlParams.get("deerPerPage");
        if (queryDeerPerPage) {
            setDeerPerPage(Number(queryDeerPerPage));
        }

        if (user) {
            async function fetchHerd() {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/herd/${id}`, {
                        withCredentials: true,
                    });
                    const herd = response.data.herd;
                    setHerd(herd);

                    const returned = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/raindeer`, {
                        withCredentials: true,
                    });
                    const herdDeer = returned.data.raindeer.filter(raindeer => raindeer.flokk === herd._id);
                    setTotalPages(Math.ceil(herdDeer.length / deerPerPage));
                    setHerdDeer(herdDeer.slice((currentPage - 1) * deerPerPage, currentPage * deerPerPage));
                } catch (error) {
                    console.error("Error fetching herd:", error);
                }
            }
            fetchHerd();
        }
    }, [user, id, currentPage, deerPerPage, location.search]);

    if (!user) return <div>Er du sikker på at du er logget inn?</div>;

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDeerPerPageChange = (e) => {
        const newDeerPerPage = Number(e.target.value);
        setDeerPerPage(newDeerPerPage);
        window.history.replaceState(null, null, `?deerPerPage=${newDeerPerPage}`);
    };

    return (
        <div>
            <h1>Reinsdyr i flokken: {herd.name}</h1>
            <label htmlFor="">
                Antall reinsdyr per side:
                <input
                    type="number"
                    value={deerPerPage}
                    onChange={handleDeerPerPageChange}
                    min="1"
                />
            </label>
            {herdDeer.length > 0 ? (
                herdDeer.map((raindeer) => (
                    <div key={raindeer._id}>
                        <h2>Navn: {raindeer.name}</h2>
                        <h2>Serienummer: {raindeer.serialnumber}</h2>
                        <h2>Fødselsdato: {raindeer.dateofbirth}</h2>
                        <hr />
                    </div>
                ))
            ) : (
                <div>Flokken er tom</div>
            )}

            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}