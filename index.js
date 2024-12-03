const btnTriggerTacheForm = document.querySelector("#triggerTacheForm");
const createTacheSection = document.querySelector("section.main_action");
const btnAnnulerTache = document.querySelector("#annulerTache");
const btnAjouterTache = document.querySelector("#ajouterTache");
const mainListSection = document.querySelector("section.main_list");
const tachesList = document.querySelector("section.main_list > ul");

let typeAction = 'create', editTacheID = -1;

// Window loading
window.addEventListener('DOMContentLoaded', () => {

    renderTaches();

});

function handleTacheEvents() {
    const btnSupprimerTacheList = document.querySelectorAll("#supprimerTache");
    const btnModifierTacheList = document.querySelectorAll("#modifierTache");
    const btnCompleterTacheList = document.querySelectorAll("#completerTache");

    btnSupprimerTacheList.forEach(btnSupprimer => btnSupprimer.addEventListener('click', (e) => {
        if (confirm(`Voulez-vous réellement supprimer cette tâche ?`)) {
            const tacheID = e.target.parentElement.parentElement.parentElement.getAttribute('key');
            supprimerTache(parseInt(tacheID));
            renderTaches();
        }
    }));

    btnCompleterTacheList.forEach(btnCompleter => btnCompleter.addEventListener('click',
        function () {
            const tacheID = this.closest('.taches__item').getAttribute('key');
            const isModifiee = modifierTache(parseInt(tacheID), { estTerminee: true });
            isModifiee && renderTaches();
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
    const p = document.querySelector("section.main_list > p");
    // console.log("Rendering taches...");
    if (taches.length > 0) {
        if (p)
            p.style.display = 'none';
        try {
            //Affiche la pagination
            mainListSection.innerHTML = renderPagination(taches);

            handleTacheEvents();
        } catch (error) {
            if (p)
                p.style.display = 'block';
            console.error(error);
        }
    } else {
        if (p)
            p.style.display = 'block';
    }
}

// Events
btnTriggerTacheForm.addEventListener("click", () => {
    const form = document.querySelector("form");
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
        return;
    }

    createTacheSection.style.display = "none";

    typeAction === 'create' ?
        creerTache(tacheID, tacheNom.value, tacheDateEcheance.value, tachePriorite.value, false, tacheCategorie.value, tempsRappel)
        :
        modifierTache(parseInt(editTacheID), {
            nom: tacheNom.value,
            dateEcheance: tacheDateEcheance.value,
            priorite: tachePriorite.value,
            estTerminee: false,
            categorie: tacheCategorie.value,
            rappels: tempsRappel
        });

    renderTaches();
});