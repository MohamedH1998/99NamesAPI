const express = require("express")
const { getAllNames, getSpecificName, getARandomName } = require("../controllers/namesController")

const router = express.Router();

// this call gets all the 99 names
router.get("/api/names", getAllNames)
// this call gets a random name 
router.get("/api/name/random", getARandomName)
// this call gets a specific name based on the idea - the names are in order so "0" would get the name Allah
router.get("/api/name/:id", getSpecificName)
// these calls get a random name
router.get("/", getARandomName)
router.get("*", getARandomName)


module.exports = {
    routes: router
}