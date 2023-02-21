const express = require("express");
const router = express.Router();
const Reservation = require("../models/flightModel");
let reservationData;





exports.reservation = function (request, response ){
    response.render("../views/booking.ejs", { title: "Réservation" })
}; 


// Récupération des données pour la première étape : choix de la destination, du nombre de places et de l'assurance
exports.addReservation= (request, response) => {

    

    const data = {
        destination: request.body.destination,
        nbPlaces: request.body.places,
        assurance: request.body.assurance
    };

    reservationData = new Reservation (data.destination, data.nbPlaces, data.assurance) 

    if (request.session.reservationData != undefined) reservationData = request.session.reservationData

    reservationData.setPrixBillet(); // calcul du prix avec la méthode de class
    console.log("le prix est : "+reservationData.getPrixBillet());

    request.session.reservationData = reservationData;
    console.log(reservationData)

    response.render("../views/personalDataEncoding.ejs", { title: "Encodage des voyageurs", nbPlaces: data.nbPlaces }); 
}


// Enregistrement des données noms et âges des voyageurs

exports.addNameAge= (request, response) => { 

    for (let i = 1; i <= request.session.reservationData.nbPlaces; i++) {
        reservationData.setVoyageur(request.body[`nom_voyageur_${i}`],request.body[`age_voyageur_${i}`]);
    }

    console.log("les voaygeurs: "+reservationData.getVoyageur() )
    response.render("../views/check.ejs", { title: "Validation des réservations", reservationData: reservationData, voyageur: reservationData.getVoyageur(), prixBillet : reservationData.getPrixBillet() });

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





