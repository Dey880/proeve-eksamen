import sameSpråkKart from "../assets/sameSpråkKart.png";
import ERdiagram from "../assets/ER-diagram.pdf";
import "../css/components/PageInfo.css";

export default function FAQ() {
    return (
        <div>
            <h1>Om nettsiden</h1>
            <a href="https://agate-ghost-d40.notion.site/Pr-ve-Pr-ve-eksamen-1a42e9b47a3980549e72ffcc2a2bb9b2?pvs=74">Notion</a>
            <h1>ER diagram</h1>
            <embed src={ERdiagram} type="application/pdf"/>
            <h1>Kart over samiske språk</h1>
            <img 
                src={sameSpråkKart} 
                alt="" 
                />
        </div>
    );
}