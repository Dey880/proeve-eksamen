import '../css/components/Navbar.css';

export default function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li><a href="/">Hjem</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Registrer</a></li>
                    <li><a href="/about">Om</a></li>
                    <li><a href="/profile">Profil</a></li>
                </ul>
            </nav>
        </div>
    )
}