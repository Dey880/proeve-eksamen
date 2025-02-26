export default function FAQ() {
    return (
        <div>
            <h1>FAQ</h1>
            <details name="faq">
                <summary>1. Hvem kan registrere reinsdyr i systemet?</summary>
                ✅ Kun autoriserte brukere (eiere) kan registrere reinsdyr. Brukeren må være innlogget, og de kan kun registrere reinsdyr de selv eier.
            </details>
            <details>
                <summary>2. Hvordan fungerer søkefunksjonen?</summary>
                ✅ På landingssiden finnes et søkefelt hvor du kan søke etter reinsdyr basert på alle feltene i databasen. Treffene vises umiddelbart på siden.
            </details>
            <details>
                <summary>3. Kan jeg slette reinsdyr fra databasen?</summary>
                ✅ Ja, Hvis du har registrert ett reinsdyr ved uhell eller hvis reinsdyret har omkommet, kan du slette det fra databasen. Du kan slette en reinsdyr ved å gå til "Profil"-siden etter innlogging og trykke på "Rediger"-knappen under dyret du vill slette også "Slett reinsdyr" for å slette.
            </details>
            <details>
                <summary>4. Kan jeg endre informasjonen om et registrert reinsdyr?</summary>
                ✅ Ja, men kun eiere kan redigere informasjon om sine egne reinsdyr. Endringer kan gjøres via "Profil"-siden etter innlogging.
            </details>
            <details>
                <summary>5. Hvorfor må jeg oppgi et kontaktspråk ved registrering?</summary>
                ✅ Dette gjør at systemet kan tilpasse kommunikasjonsspråket til den samiske språkgruppen du foretrekker.
            </details>
        </div>
    );
}