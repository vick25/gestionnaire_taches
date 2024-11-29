const TacheCardComponent = (tache) => {
    return `<li key=${tache.tacheID} class="taches__item">
        <div class="taches__item-wrapper">
            <div class=${tache.estTerminee ? "text-decoration-line-through taches__item_head" : "taches__item_head"}>
                <h3>${tache.nom}</h3>
                <p><b>Catégorie</b>: ${tache.categorie}</p>
                <p><b>Priorité</b>: ${tache.priorite}</p>
                <p><b>Créée le</b> : ${tache.getDateCreation()}</p>
                <p><b>Echéance</b> : ${tache.dateEcheance}</p>
            </div>
            <div class="taches__item__footer">
                ${!tache.estTerminee && '<button>Modifier</button>'}
                <button type="button">Supprimer</button>
                <button type="button">Compléter</button>
            </div>
        </div>
    </li>`
};
