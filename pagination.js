const itemsPerPage = 10;
let page = 1;

const renderPagination = () => {
    const countTache = taches.length;
    const aPrec = itemsPerPage * (page - 1) > 0;
    const aSuiv = itemsPerPage * (page - 1) + itemsPerPage < countTache;

    const handleChangePage = (action) => {
        action === "prec" ? page-- : page++;
        renderPagination();
    };

    const pagination = taches.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // Events
    document.querySelector("button[onclick*=prec]")?.addEventListener("click", () => handleChangePage("prec"));
    document.querySelector("button[onclick*=suiv]")?.addEventListener("click", () => handleChangePage("suiv"));


    return `
    <div>
        <ul>
                ${pagination.map((tache) => `<li>${tache}</li>`).join("")}
            </ul>

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
    </div>`;
}