const btnCreerTache = document.querySelector("#creerTache");
const createTacheSection = document.querySelector("section.main_action");
const annulerTache = document.querySelector("#annulerTache");
const ajouterTache = document.querySelector("#ajouterTache");
const p = document.querySelector("section.main_list > p");
const tachesList = document.querySelector("section.main_list > ul")

let isTacheAjouteeState = false;

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
    if (taches.length > 0) {
        p.style.display = 'none';
        try {
            taches.map(({ tacheID, nom, dateEcheance, categorie, priorite, estTerminee, rappels, _dateCreation }) => {
                const tacheObj = creerObjetTache();
                tacheObj.defineTache(tacheID, nom, dateEcheance, priorite, estTerminee, categorie, rappels);
                tacheObj.setDateCreation(_dateCreation);
                tachesList.innerHTML = TacheCardComponent(tacheObj);
            });

            //Affiche la pagination
            renderPagination();
        } catch (error) {
            p.style.display = 'block';
            console.error(error);
        }
    } else {
        p.style.display = 'block';
    }
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

    if (new Date(dateEcheance.value).getTime() < new Date().now()) {
        alert(`La date d'échéance n'est pas valide`);
        isTacheAjouteeState.isTrue = false;
        return;
    }

    creerTache(tacheID, tacheNom.value, dateEcheance.value, priorité.value, false, categorie.value, `${rappel.value}${selectedRappel}`);
    isTacheAjouteeState.isTrue = true;
});