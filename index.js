const btnCreerTache = document.querySelector("#creerTache");
const createTacheSection = document.querySelector("section.main_action");
const form = document.querySelector("form");
const btnAnnulerTache = document.querySelector("#annulerTache");
const btnAjouterTache = document.querySelector("#ajouterTache");
const p = document.querySelector("section.main_list > p");
const mainListSection = document.querySelector("section.main_list");
const tachesList = document.querySelector("section.main_list > ul");

let isTacheAjouteeState = false,
    typeAction = 'create', editTacheID = -1;

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
        if (confirm(`Voulez-vous réellement supprimer cette tâche ?`)) {
            const tacheID = e.target.parentElement.parentElement.parentElement.getAttribute('key');
            supprimerTache(parseInt(tacheID));
            isTacheAjouteeState = true;
        }
    }));

    btnCompleterTacheList.forEach(btnCompleter => btnCompleter.addEventListener('click',
        function () {
            const tacheID = this.closest('.taches__item').getAttribute('key');
            const isModifiee = modifierTache(parseInt(tacheID), { estTerminee: true });
            if (isModifiee)
                isTacheAjouteeState = true;
        })
    );

    btnModifierTacheList.forEach(btnModifier => btnModifier.addEventListener('click',
        function () {
            editTacheID = this.closest('.taches__item').getAttribute('key');
            if (editTacheID) {
                typeAction = 'modify';
                createTacheSection.style.display = "block";
                btnAjouterTache.textContent = 'Modifier';

                const { nom, categorie, priorite, dateEcheance, rappels } = findTache(editTacheID);
                tacheNom.value = nom;
                tacheDateEcheance.value = dateEcheance;
                tachePriorite.value = priorite;
                tacheCategorie.value = categorie;
                const rappelsTaches = rappels[0];
                tacheRappel.value = rappelsTaches.slice(0, -1);
                const radioButton = document.querySelector(`input[name="tacheRappels"][value="${rappelsTaches.slice(-1)}"]`);
                if (radioButton) {
                    radioButton.checked = true;
                }
                // const isModifiee = modifierTache(parseInt(tacheID), { estTerminee: true });
                // if (isModifiee)
                //     isTacheAjouteeState = true;
            }
        })
    );
}

function renderTaches() {
    // console.log("Rendering taches...");
    if (taches.length > 0) {
        p.style.display = 'none';
        try {
            //Affiche la pagination
            mainListSection.innerHTML = renderPagination(taches);

            handleTacheEvents();
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
    form.reset();
    typeAction = 'create';
    createTacheSection.style.display = "block";
    btnAjouterTache.textContent = 'Ajouter';
});

btnAnnulerTache.addEventListener("click", () => {
    typeAction = 'create';
    createTacheSection.style.display = "none";
});

btnAjouterTache.addEventListener("click", (e) => {
    e.preventDefault();
    const tacheID = taches.length == 0 ? taches.length + 1 :
        parseInt(taches[taches.length - 1].tacheID) + 1;
    const selectedRappel = document.querySelector('input[name="tacheRappels"]:checked').value;
    const tempsRappel = [`${tacheRappel.value}${selectedRappel}`];

    if (new Date(tacheDateEcheance.value).getTime() < new Date().getTime()) {
        alert(`La date d'échéance n'est pas valide`);
        isTacheAjouteeState = false;
        return;
    }

    createTacheSection.style.display = "none";

    if (typeAction === 'create') {
        creerTache(tacheID, tacheNom.value, tacheDateEcheance.value, tachePriorite.value, false, tacheCategorie.value, tempsRappel);
    } else {
        const isModifiee = modifierTache(parseInt(editTacheID), {
            nom: tacheNom.value,
            dateEcheance: tacheDateEcheance.value,
            priorite: tachePriorite.value,
            estTerminee: false,
            categorie: tacheCategorie.value,
            rappels: tempsRappel
        });
    }
    isTacheAjouteeState = true;
});