const express = require("express");
const flightController = require("../controllers/flightController");

const router = express.Router();

// Route pour la page d'accueil
router.get("/", flightController.reservation);

// 
router.post('/addReservation', flightController.addReservation);

// Route pour la page d'encodage des voyageurs


//
router.post('/addNameAge', flightController.addNameAge);

//Route pour annuler la réseravation
router.post("/annuler", flightController.annuler)


router.post("/confirmation", flightController.confirmation)



module.exports = router;
