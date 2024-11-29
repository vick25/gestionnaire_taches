const btnCreerTache = document.querySelector("#creerTache");
const createTacheSection = document.querySelector("section.main_action");
const annulerTache = document.querySelector("#annulerTache");
const ajouterTache = document.querySelector("#ajouterTache");

btnCreerTache.addEventListener("click", () => {
    createTacheSection.style.display = "block";
});

annulerTache.addEventListener("click", () => {
    createTacheSection.style.display = "none";
});
