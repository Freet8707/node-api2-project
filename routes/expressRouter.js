const express = require("express");

const db = require("../data/db")

const router = express.Router();

router.use(express.json())

router.get("/", (req, res) => {
    db.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        res.status(500).json({ message: "there was an error" })
    })
})

router.post("/", (req, res) => {

    db.insert(req.body)
        .then((newPost) => {
            console.log(newPost);
            res.status(201).json(newPost);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "there was an error" });
        })
})

module.exports = router