'use strict';

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
    Moyenne: 2,
    Haute: 3
});

function convertToMilliSeconds(valeur) {
    const nombre = parseInt(valeur.slice(0, -1), 10);
    const unite = valeur.slice(-1);

    switch (unite) {
        case 'm': // minutes
            return nombre * 60 * 1000;
        case 'h': // heures
            return nombre * 60 * 60 * 1000;
        case 'j': // jours
            return nombre * 24 * 60 * 60 * 1000;
        default:
            alert(`Unité non valide, veuillez utiliser 'm' pour minutes, 'h' pour heures et 'j' for jours`);
    }
}

const creerObjetTache = () => {
    return {
        tacheID: "",
        nom: "",
        dateEcheance: null,
        priorite: "",
        estTerminee: "",
        categorie: "",
        _dateCreation: new Date(),
        getDateCreation: function () {
            return this._dateCreation;
        },
        defineTache: function (tacheID, nom, dateEcheance, priorite, estTerminee, categorie, rappels) {
            this.tacheID = tacheID;
            this.nom = nom;
            this.dateEcheance = dateEcheance;
            this.priorite = priorite;
            this.estTerminee = estTerminee;
            this.categorie = categorie;
            this.rappels = rappels;
        },
        rappels: [],
        defineRappels: function (valeur, type = "m") {
            if (!isNaN(valeur))
                this.rappels.push(`${valeur}${type}`)
        },
        _sortRappels: function sortRappels() {
            return this.rappels.sort((a, b) => {
                return convertToMilliSeconds(a) - convertToMilliSeconds(b);
            });
        },
        getRappels: function () {
            return this._sortRappels;
        },
        defineNotifications: function () {
            if (this.getRappels().length > 0) {
                const tempsRappel = convertToMilliSeconds(this.getRappels().shift());
                const tempsEcheance = new Date(this.dateEcheance).getTime();

                const tempsNotification = tempsEcheance - tempsRappel;
                const interval = tempsNotification - new Date().now();

                setTimeout(() => {
                    alert(`Notification : Rappel pour exécuter la tâche.`);
                }, interval);
            }
        },
        tempsRestant: function () {
            const maintenant = new Date();
            const echeance = new Date(this.dateEcheance);
            if (echeance < maintenant) {
                return "L'échéance est déjà passée.";
            }

            const differenceEcheance = echeance - maintenant;
            const min = 60 * 1000, heure = 60 * min, jour = 24 * heure;

            return `${Math.floor(differenceEcheance / jour)} jours, ${Math.floor((differenceEcheance % jour) / heure)} heures, ${Math.floor((differenceEcheance % heure) / min)} minutes`;
        }
    }
}

const creerTache = (tacheID, nom, dateEcheance, priorite, estTerminee, categorie, rappels) => {
    const tache = creerObjetTache();
    tache.defineTache(tacheID, nom, dateEcheance, priorite, estTerminee, categorie, rappels);
    // tache.defineTache('Tache1', new Date().toLocaleDateString(), prioriteEnum.Haute, true, categorieEnum.Urgent, []);
    taches.push(tache);
    // console.log(taches);
    saveToLocalStorage(taches);
}

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
const trierTachesParPriorites = () => {
    const tachesTriees = taches.sort((a, b) => a.priorite - b.priorite);
    // const tachesTriees = taches.filter(tache => tache.priorite === priorite);
    return tachesTriees;
}

// console.log(trierTachesParPriorites(1))

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

// Code à revoir car l'explication n'est pas explicite. Les rappels ne sont pas des dates, mais cette fonction recois une dateRappel comme parametres.
function ajouterRappel(tache, dateRappel) {
    if (new Date(dateRappel) > new Date(tache.dateEcheance)) {
        if (!Array.isArray(dateRappel)) {
            dateRappel = [dateRappel];
        }
        taches.map(t => {
            return t.tacheID === tache.tacheID ?
                { ...t, rappels: [dateRappel] } : tache
        });
    }
}

const rechercheTache = (query) => {
    const tachesFiltrees = taches.filter(tache => tache.nom === query || tache.categorie === query);
    return tachesFiltrees;
}

function genererRapport() {
    //nombre total de tâches, nombre de tâches terminées, nombre de tâches par priorité
    const nbreTaches = taches.length;
    const nbreTachesTerminees = taches.reduce((acc, currentValue) => {
        return currentValue.estTerminee ? acc + 1 : 0;
    }, 0);
    const { '1': Faible, '2': Moyenne, '3': Haute } = taches.reduce((acc, currentValue) => {
        const { priorite } = currentValue
        acc[priorite] = (acc[priorite] || 0) + 1;
        return acc;
    }, {});

    return `Il y a un nombre total de ${nbreTaches} tâches.
            Un nombre de ${nbreTachesTerminees} tâches sont terminiées.
            En termes de priorités: ${Faible ? Faible + ' tâches ont la priorité faible. ' : ''}
                    ${Moyenne ? Moyenne + ' tâches ont la priorité moyenne. ' : ''}
                    ${Haute ? Haute + ' tâches ont la priorité haute. ' : ''}`;
}