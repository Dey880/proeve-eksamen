import Search from "../components/Search"
import "../css/pages/Landingpage.css"

export default function LandingPage() {
    return (
        <div className="landing-page">
            <h1>Velkommen til ReinsdyrDb</h1>
            <Search></Search>
        </div>
    )
}