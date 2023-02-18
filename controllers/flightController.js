const express = require("express");
const router = express.Router();
const Reservation = require("../models/flightModel");
const Voyageur = require("../models/voyageurModel");
let reservationData;


// Récupération des données pour la première étape : choix de la destination, du nombre de places et de l'assurance


exports.reservation = function (request, response ){

    if (request.session.reservationData != undefined) reservationData = request.session.reservationData
    console.log(reservationData);
    response.render("../views/booking.ejs", { title: "Réservation" })
    

}; 

// Enregistrement des données pour la première étape

exports.addReservation= (request, response) => {

    const data = {
        destination: request.body.destination,
        nbPlaces: request.body.places,
        assurance: request.body.assurance
    };

    let prixBillet = 45 * data.nbPlaces;
    if (data.assurance === "on") {
        prixBillet += 20;
    }

    let reservationData = new Reservation (data.destination, data.nbPlaces, data.assurance, prixBillet) 
    request.session.reservationData = reservationData;
    console.log(reservationData)

    //response.redirect("/encodage")
    response.render("../views/personalDataEncoding.ejs", { title: "Encodage des voyageurs", nbPlaces: data.nbPlaces }); 
}


// Enregistrement des données pour la deuxième étape : encodage des noms et âges des voyageurs

exports.addNameAge= (request, response) => { 
    const voyageurs = [];
    for (let i = 1; i <= request.session.reservationData.nbPlaces; i++) {
        voyageurs.push(new Voyageur(request.body[`nom_voyageur_${i}`], request.body[`age_voyageur_${i}`]));
    }
    console.log(voyageurs)
    request.session.voyageurs = voyageurs;

    response.render("../views/check.ejs", { title: "Validation des réservations", reservationData: request.session.reservationData, voyageurs: voyageurs });

}

// confirmation 
exports.confirmation = function (request, response ){
    response.render("../views/confirmation.ejs", { title: "Encodage" })
}

//Annulation de la réservation
exports.annuler= (request, response) => { 
    request.session.destroy();
    response.redirect("/");
}







/*

// Enregistrement des données pour la troisième étape : validation des données
router.post("/validation", (req, res) => {
    // Enregistrement des données en base de données
    // Code pour enregistrer les données en base de données

    res.render("confirmation", { title: "Confirmation", reservationData: req.session.reservationData, voyageurs: req.session.voyageurs });
});
*/

