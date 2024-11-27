const taches = JSON.parse(localStorage.getItem('taches')) || [];
// Save to LocalStorage
function saveToLocalStorage(array) {
    localStorage.setItem('taches', JSON.stringify(array));
}

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
        tacheID: "",
        nom: "",
        dateEcheance: null,
        priorite: "",
        estTerminee: "",
        categorie: "",
        _dateCreation: new Date(),
        rappels: [],
        defineTache: function (tacheID, nom, dateEcheance, priorite, estTerminee, categorie, rappels) {
            this.tacheID = tacheID;
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
console.log(taches);

saveToLocalStorage(taches);

const modifierTache = (tacheID, proprietesChangees) => {
    const tacheModifiee = taches.find(tache => tache.id === tacheID);
    if (tacheModifiee) {
        taches.map(tache => {
            return tache.id === tacheID ? { ...tache, ...proprietesChangees } : tache;
        });
        saveToLocalStorage(taches);
        return true;
    }
    return false;
};

const supprimerTache = (tacheID) => {
    taches = taches.filter(tache => tache.tacheID !== tacheID);
    saveToLocalStorage(taches);
}
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

function filtrerTaches(categorie, priorite) {
    const tachesFiltrees = taches.filter(tache => tache.categorie === categorie && tache.priorite === priorite);
    return tachesFiltrees;
}

function ajouterRappel(tache, dateRappel) {
    if (new Date(dateRappel) > new Date(tache.dateEcheance)) {
        taches.map(t => {
            return t.tacheID === tache.tacheID ?
                { ...t, rappels: [] } : tache
        });
    }
}