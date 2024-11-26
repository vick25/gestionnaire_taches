const creerTache = () => {
    return {
        nom: "",
        dateEcheance: "",
        priorite: "",
        estTerminee: "",
        categorie: "",
        rappels: "",
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