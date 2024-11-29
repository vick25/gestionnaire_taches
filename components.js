const TacheCardComponent = (tache) => {
    return `<li key=${tache.tacheID} class="taches__items">
        <div class="taches__item-wrapper">
            <div class=${tache.estTerminee ? "text-decoration-line-through" : ""}>
                <h3>${tache.nom}</h3>
                <p><b>Catégorie:</b> ${tache.categorie}</p>
                <p>Date créee: ${tache.getDateCreation()}</p>
            </div>
            <div class="taches__item__footer">
                ${!tache.estTerminee && '<button>Modifier</button>'}
                <button type="button">Supprimer</button>
                <button type="button">Compléter</button>
            </div>
        </div>
    </li>`
};
