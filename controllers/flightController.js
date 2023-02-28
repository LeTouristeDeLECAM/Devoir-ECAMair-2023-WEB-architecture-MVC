const express = require("express");
const router = express.Router();
const Reservation = require("../models/flightModel");
let reservationData;
const mysql = require('mysql2'); 





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

// confirmation et enregistrement dans la data Base
exports.confirmation = function (request, response ){



    const connection = mysql.createConnection({
        host: 'localhost',
        port:'3306',
        user: 'root',
        password: 'root',
        database: 'ecamair'
      });
   

      var sql = `INSERT INTO destinationtable (destination, prixBillet, assurance, places) VALUES ("${reservationData.destination}",${reservationData.getPrixBillet()}, '${reservationData.assurance}',  ${reservationData.getVoyageur().length})`;
  
      connection.query(sql, (error, results) => {
        if (error) {
            
            console.log("erreur de connection");
            
          throw error;
        }
        console.log('Reservation enregisté dans la database:', results);
      });

      //connection.end();

    


      
      // Recherche de la derniere clé primaire
      
      var lastId;
      sql = 'SELECT MAX(idDestination) AS lastId FROM destinationtable';
      connection.query(sql, (err, result) => {
        if (err) throw err;
          lastId = result[0].lastId;
          console.log(result[0]);
          console.log(`La dernière clé primaire de la table "destinationtable" est ${lastId}`);



          
        });
      console.log(`2 La dernière clé primaire de la table "destinationtable" est ${lastId}`);

      //connection.end();



    var nomAge= [];

    for (let i = 0; i < reservationData.getVoyageur().length; i++) {
      console.log("nom "+reservationData.getVoyageur()[i].nom + `dernier id ${lastId}`)
      nomAge.push([lastId ,reservationData.getVoyageur()[i].nom, reservationData.getVoyageur()[i].age] );
      }
      

    console.log(nomAge);
      sql = `INSERT INTO voyageurs (idDestination ,Nom, age) VALUES ?`;


      connection.query(sql, [nomAge], (error, results) => {
        if (error) {
            
            console.log("erreur de connection");
            
          throw error;
        }
        console.log('Reservation enregisté dans la database:', results);
      });


    connection.end();

    response.render("../views/confirmation.ejs", { title: "Encodage" })
}

//Annulation de la réservation
exports.annuler= (request, response) => { 
    request.session.destroy();
    response.redirect("/");
}





