import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function EditHerd() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        serieinndeling: "",
        buemerke_navn: "",
        area: "",
        buemerke_bilde: null,
    });
    const [msg, setMsg] = useState(null);
    const owner = user?._id;

    useEffect(() => {
        const fetchHerd = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/herd/${id}`, {
                    withCredentials: true
                });
                setFormData({
                    ...response.data.herd,
                    buemerke_bilde: null,
                });
                if (owner !== response.data.herd.owner) {
                    window.location.replace("/");
                }
            } catch (error) {
                console.error("Error fetching herd data:", error);
                setMsg("Failed to fetch herd data");
            }
        };
        fetchHerd();
    }, [id, owner]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, "name", value, "value");
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            buemerke_bilde: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "buemerke_bilde" && formData[key]) {
                data.append("buemerke_bilde", formData[key], formData[key].name);
            } else if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        try {
            for (let [key, value] of data.entries()) {
                console.log(key, value);
            }
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/herd/${id}`, {
                    withCredentials: true
                },
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            if (response.status === 200) {
                window.location.replace("/");
            }
        } catch (error) {
            console.error("Error updating Herd:", error);
            alert(error.response?.data?.msg || "Failed to update Herd");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/herd/${id}`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                window.location.replace("/");
            }
        } catch (error) {
            console.error("Error deleting Herd:", error);
            alert(error.response?.data?.msg || "Failed to delete Herd");
        }
    };

    return (
        <div>
            <h1>Rediger flokk</h1>
            {msg ? (
                <p>{msg}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Navn:
                        <input type="text" name="name" value={formData.name || ""} onChange={handleInputChange} />
                    </label>
                    <label>
                        Serienummer:
                        <input type="number" name="serieinndeling" value={formData.serieinndeling || ""} onChange={handleInputChange} />
                    </label>
                    <label>
                        Buemerke Navn:
                        <input type="text" name="buemerke_navn" value={formData.buemerke_navn || ""} onChange={handleInputChange} />
                    </label>
                    <label htmlFor="area">Velg primært beiteområdet</label>
                    <select id="area" onChange={handleInputChange} name="area" value={formData.area}>
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
                    <label>
                        Buemerke Bilde:
                        <input type="file" name="buemerke_bilde" onChange={handleFileChange} />
                    </label>
                    <button type="submit">Save Changes</button>
                </form>
            )}
            <button onClick={handleDelete}>Slett flokk</button>
        </div>
    );
}