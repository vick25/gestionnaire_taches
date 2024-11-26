const taches = [];

const categorieEnum = Object.freeze({
    Travail: "Travail",
    Personnel: "Personnel",
    Urgent: "Urgent"
});

const prioriteEnum = Object.freeze({
    Faible: 1,
    Moyen: 2,
    Haute: 3
});

const creerTache = () => {
    return {
        nom: "",
        dateEcheance: null,
        priorite: "",
        estTerminee: "",
        categorie: "",
        rappels: [],
        defineTache: function (nom, dateEcheance, priorite, estTerminee, categorie, rappels) {
            this.nom = nom;
            this.dateEcheance = dateEcheance;
            this.priorite = priorite;
            this.estTerminee = estTerminee;
            this.categorie = categorie;
            this.rappels = rappels;
        }
    }
}

const tache1 = creerTache();
tache1.defineTache('Tache1', new Date().toLocaleDateString(), prioriteEnum.Haute, true, categorieEnum.Urgent, []);
taches.push(tache1);
console.log(taches)

const trierTachesParPriorites = (priorite) => {
    const tachesTriees = taches.filter(tache => tache.priorite === priorite);
    return tachesTriees;
}

console.log(trierTachesParPriorites(1))