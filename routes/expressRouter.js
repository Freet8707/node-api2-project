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

router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(400).json({ message: "there was an error" })
        })
})

router.get("/:id/comments", (req, res) => {

    db.findPostComments(req.params.id)
        .then((comments) => {
            res.status(200).json(comments)
        })
        .catch((error) => {
            res.status(400).json({ message: "there was an error" })
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

router.post("/:id/comments", (req, res) => {
    // db.findById(req.params.id)
    //     .then((post) => {
    //         console.log(post);
    //         res.status(200).json(post);
    //     })
    //     .catch((error) => {
    //         res.status(500).json(error);
    //     })
    // const body = { ...req.body, id: req.params.id }

    db.insertComment(req.body)
        .then((comment) => {
            console.log(comment)
            res.status(201).json(comment)
        })
        .catch((err) => {
            res.status(500).json({ message: "there was an error"})
        })
})



module.exports = router