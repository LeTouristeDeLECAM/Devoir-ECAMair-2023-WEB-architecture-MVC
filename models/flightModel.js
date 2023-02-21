const Voyageur = require("../models/voyageurModel");

class Reservation {

    #voyageur = [];
    #nom =[];
    #age=[];
    #prixBillet;

    constructor(destination, nbPlaces, assurance) {
        this.destination = destination;
        this.nbPlaces = nbPlaces;
        this.assurance = assurance;
        //setPrixBillet();
    }

    setVoyageur(nom, age){
        this.#voyageur.push(new Voyageur(nom, age));

    }

    getVoyageur(){
        return this.#voyageur;
    }

    
    setPrixBillet(){
        
        let prix = 45 * this.nbPlaces;
            if (this.assurance === "on") {
            prix += 20;
        }
        this.#prixBillet=prix;
    }


    getPrixBillet(){
        return this.#prixBillet;
    }
  

}



module.exports = Reservation;

