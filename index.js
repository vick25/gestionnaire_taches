const btnCreerTache = document.querySelector("#creerTache");
const createTacheSection = document.querySelector("section.main_action");
const annulerTache = document.querySelector("#annulerTache");
const ajouterTache = document.querySelector("#ajouterTache");
const isTacheAjouteeState = false;

// Window loading
window.addEventListener('DOMContentLoaded', () => {

    renderTaches();

    function monitorTacheState() {
        let previousState = isTacheAjouteeState;

        setInterval(() => {
            if (isTacheAjouteeState && isTacheAjouteeState !== previousState) {
                renderTaches();
                previousState = isTacheAjouteeState;
            }
        }, 100);
    }

    monitorTacheState();
});


function renderTaches() {
    console.log("Rendering taches...");
    taches.length > 0 && taches.map((tache) => {
        console.log(tache.nom)
    });
}

// Events
btnCreerTache.addEventListener("click", () => {
    createTacheSection.style.display = "block";
});

annulerTache.addEventListener("click", () => {
    createTacheSection.style.display = "none";
});

ajouterTache.addEventListener("click", (e) => {
    e.preventDefault();
    const tacheID = taches.length + 1;
    const selectedRappel = document.querySelector('input[name="rappels"]:checked').value;

    creerTache(tacheID, tacheNom.value, dateEcheance.value, priorité.value, false, categorie.value, `${rappel.value}${selectedRappel}`);
    isTacheAjouteeState.isTrue = true;
});