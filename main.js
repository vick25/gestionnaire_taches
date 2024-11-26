const categorieEnum = Object.freeze({
    Travail: "Travail",
    Personnel: "Personnel",
    Urgent: "Urgent"
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
tache1.defineTache('Tache1', new Date().toLocaleDateString(), "2", true, categorieEnum.Urgent, []);
console.log(creerTache());