const itemsPerPage = 10;
let page = 1;

const renderPagination = (taches) => {
    const countTache = taches.length;
    const aPrec = itemsPerPage * (page - 1) > 0;
    const aSuiv = itemsPerPage * (page - 1) + itemsPerPage < countTache;

    const handleChangePage = (action) => {
        action === "prec" ? page-- : page++;
        renderPagination(taches);
    };

    const paginationTaches = taches.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // Events
    document.querySelector("button[onclick*=prec]")?.addEventListener("click", () => handleChangePage("prec"));
    document.querySelector("button[onclick*=suiv]")?.addEventListener("click", () => handleChangePage("suiv"));

    return `
    <ul class="taches_list">
        ${paginationTaches.map(({ tacheID, nom, dateEcheance, categorie, priorite, estTerminee, rappels, _dateCreation }) => {
        const tacheObj = creerObjetTache();
        tacheObj.defineTache(tacheID, nom, dateEcheance, priorite, estTerminee, categorie);
        tacheObj.setDateCreation(_dateCreation);
        tacheObj.defineRappels(rappels);
        tacheObj.defineNotifications();

        return TacheCardComponent(tacheObj);
    }).join('')}
    </ul>
    <div class="paginationButtons">
        <button
            disabled=${!aPrec}
            onclick="handleChangePage('prec')"
        >
            Précédent
        </button>
        <button
            disabled=${!aSuiv}
            onclick="handleChangePage('suiv')"
        >
            Suivant
        </button>
    </div>`
}