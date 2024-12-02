const TacheCardComponent = (tache) => {
    return `<li key=${tache.tacheID} class="taches__item">
        <div class="taches__item-wrapper">
            <div class=${tache.estTerminee ? "text-decoration-line-through taches__item_head" : "taches__item_head"}>
                <h3>${tache.nom}</h3>
                <p><b>Catégorie</b> : ${tache.categorie}</p>
                <p><b>Priorité</b> : ${tache.priorite}</p>
                <p><b>Créée le</b> : ${formatDateTime(tache.getDateCreation())}</p>
                <p><b>Echéance</b> : ${formatDate(tache.dateEcheance)}</p>
            </div>
            <div class="taches__item__footer">
                ${!tache.estTerminee ? '<button type="button" id="modifierTache" class="btn-warning">Modifier</button>' : ''}
                <button type="button" id="supprimerTache" class="btn-danger">Supprimer</button>
                <button type="button" id="completerTache" class="btn-success" ${tache.estTerminee ? 'disabled' : ''}>Compléter</button>
            </div>
        </div>
    </li>`
};

// <button type="button" id="supprimerTache" class="btn-danger" onclick="${supprimerTache(tache.tacheID)}">Supprimer</button>