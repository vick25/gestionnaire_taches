const btnCreerTache = document.querySelector("#creerTache");
const createTacheSection = document.querySelector("section.main_action");
const btnAnnulerTache = document.querySelector("#annulerTache");
const btnAjouterTache = document.querySelector("#ajouterTache");
const p = document.querySelector("section.main_list > p");
const mainListSection = document.querySelector("section.main_list");
const tachesList = document.querySelector("section.main_list > ul");

let isTacheAjouteeState = false;

// Window loading
window.addEventListener('DOMContentLoaded', () => {

    renderTaches();

    function monitorTacheState() {
        let previousState = isTacheAjouteeState;

        setInterval(() => {
            if (isTacheAjouteeState && isTacheAjouteeState !== previousState) {
                renderTaches();
                isTacheAjouteeState = false;
                previousState = isTacheAjouteeState;
            }
        }, 100);
    }

    monitorTacheState();
});

function handleTacheEvents() {
    const btnSupprimerTacheList = document.querySelectorAll("#supprimerTache");
    const btnModifierTacheList = document.querySelectorAll("#modifierTache");
    const btnCompleterTacheList = document.querySelectorAll("#completerTache");

    btnSupprimerTacheList.forEach(btnSupprimer => btnSupprimer.addEventListener('click', (e) => {
        const tacheID = e.target.parentElement.parentElement.parentElement.getAttribute('key');
        supprimerTache(parseInt(tacheID));
        isTacheAjouteeState = true;
    }));

    btnCompleterTacheList.forEach(btnCompleter => btnCompleter.addEventListener('click',
        function () {
            const tacheID = this.closest('.taches__item').getAttribute('key');
            const isModifiee = modifierTache(parseInt(tacheID), { estTerminee: true });
            if (isModifiee)
                isTacheAjouteeState = true;
        })
    );
}

function renderTaches() {
    console.log("Rendering taches...");
    if (taches.length > 0) {
        tachesList.innerHTML = '';
        p.style.display = 'none';
        try {
            taches.map(({ tacheID, nom, dateEcheance, categorie, priorite, estTerminee, rappels, _dateCreation }) => {
                const tacheObj = creerObjetTache();
                tacheObj.defineTache(tacheID, nom, dateEcheance, priorite, estTerminee, categorie, rappels);
                tacheObj.setDateCreation(_dateCreation);
                tachesList.innerHTML += TacheCardComponent(tacheObj);
            });

            handleTacheEvents();

            //Affiche la pagination
            // mainListSection.innerHTML += renderPagination();
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

btnAnnulerTache.addEventListener("click", () => {
    createTacheSection.style.display = "none";
});

btnAjouterTache.addEventListener("click", (e) => {
    e.preventDefault();
    const tacheID = taches.length == 0 ? taches.length + 1 : parseInt(taches[taches.length - 1].tacheID) + 1;
    const selectedRappel = document.querySelector('input[name="rappels"]:checked').value;

    if (new Date(dateEcheance.value).getTime() < new Date().getTime()) {
        alert(`La date d'échéance n'est pas valide`);
        isTacheAjouteeState = false;
        return;
    }

    createTacheSection.style.display = "none";

    creerTache(tacheID, tacheNom.value, dateEcheance.value, priorité.value, false, categorie.value, `${rappel.value}${selectedRappel}`);
    isTacheAjouteeState = true;
});