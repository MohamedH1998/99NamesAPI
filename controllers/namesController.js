"use strict"

const firebase = require("../db")
const firestore = firebase.firestore()


// const addName = async (req, res, next) => {
//     try {
//         namesArr[0]
//         namesArr.map(async (nameObj, i) => {
//             await firestore.collection("Names").doc().set(nameObj)
//         })
//         res.send("Added to collection :)")
//     } catch (e) {
//         res.status(400).res.send(e.message)
//     }
// }

const getAllNames = async (req, res, next) => {
    try {
        const names = await firestore.collection("Names").orderBy("id")
        const snapshot = await names.get()
        const list = snapshot.docs.map((docs) => docs.data())
        res.send(list)
    } catch (e) {
        res.status(400).send("Something went wrong with retrieving all the names")
    }
}

const getSpecificName = async (req, res, next) => {
    try {
        const id = req.params.id
        const name = await firestore.collection("Names").where("id", "==", parseInt(id))
        const snapshot = await name.get()
        const data = snapshot.docs.map((docs) => docs.data())
        if (data.length === 0) {
            res.status(400).send("A name with that id does not seem to exist unfortunately")
        } else {
        res.send(data)
        }
    }catch (e) {
        res.status(400).send(e.message)

    }
}

const getARandomName = async (req, res, next) => {
    try {
        const randomID = Math.floor((Math.random()*100));
        const name = await firestore.collection("Names").where("id", "==", parseInt(randomID))
        console.log(randomID)
        const snapshot = await name.get()
        const data = snapshot.docs.map((docs) => docs.data())
        if (data.length === 0) {
            res.status(400).send("A name with that id does not seem to exist unfortunately")
        } else {
        res.send(data)
        }
    } catch (e) {
        res.status(400).send(e.message)

    }
}
module.exports = {
    getAllNames,
    getSpecificName,
    getARandomName
}