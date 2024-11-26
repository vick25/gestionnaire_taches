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

const calculerImportance = (tache) => {
    let importance;
    const diffenceEnTemps = new Date(tache.dateEcheance) - new Date();

    if (isNaN(diffenceEnTemps)) {
        throw new Error('La date d’échéance fournie est invalide.');
    }

    const joursRestants = Math.ceil(diffenceEnTemps / (1000 * 60 * 60 * 24));
    switch (tache.priorite) {
        case 1:
            if (joursRestants <= 2)
                importance = 'Très urgent';
            else if (joursRestants > 3 && joursRestants < 6) {
                importance = 'Urgent';
            } else {
                importance = 'Dans le délai';
            }
            break;
        case 2:
            if (joursRestants <= 2)
                importance = 'Très urgent';
            else if (joursRestants > 3 && joursRestants < 6) {
                importance = 'Urgent';
            } else {
                importance = 'Dans le délai';
            }
            break;
        case 3:
            if (joursRestants <= 2)
                importance = 'Très urgent';
            else if (joursRestants > 3 && joursRestants < 6) {
                importance = 'Urgent';
            } else {
                importance = 'Dans le délai';
            }
            break;
    }
    return importance;
}