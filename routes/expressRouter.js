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

    const posts =  db.findById(id)
        .then((posts) => {
            return res.json(posts)
        })
        .catch((error) => {
            return res.json(error)
        })
    
    if(posts.length > 0){
        return res.status(200).json(posts)
    } else {
        return res.status(404).json({ message: "the post with the specified ID does not exist" })
    }
})

router.get("/:id/comments", (req, res) => {

    const foundPost = db.findById(req.params.id)
        .then((post) => {
            // console.log(post)
            return res.json(post)
        })
        .catch((error) => {
            return res.json(error)
        })

    if(!foundPost){
        return res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else {
        return db.findPostComments(req.params.id)
        .then((comments) => {
            res.status(200).json(comments)
        })
        .catch((error) => {
            res.status(500).json({ message: "the comments information could not be retrieved" })
        })
    }
    
})

router.post("/", (req, res) => {

    if(!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post" })
    } else {
        db.insert(req.body)
        .then((newPost) => {
            console.log(newPost);
            res.status(201).json(newPost);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "there was an error" });
        })
    }    
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

router.put("/:id", (req, res) => {

    const foundPost = db.findById(req.params.id)
        .then((post) => {
            // console.log(post)
            return res.json(post)
        })
        .catch((error) => {
            console.log(error)
        })
    
    if(!foundPost){
        res.status(404).json({ message: "the post with the specified ID does not exist" })
    }

    if(!req.body.title || !req.body.contents){
        return res.status(400).json({ message: "Please provide title and contents for the post" });
    } else {
        return db.update(req.params.id, req.body)
        .then((newPost) => {
            console.log(req.body)
            res.status(200).json(newPost)
        })
        .catch((error) => {
            res.status(500).json({ message: "The post information could not be modified" })
        })
    };    
})

router.delete("/:id", (req, res) => {

    const foundPost = db.findById(req.params.id)
        .then((post) => {
            // console.log(post)
            return res.json(post)
        })
        .catch((error) => {
            console.log(error)
        })

    if(!foundPost){
        return res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else {
        return db.remove(req.params.id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(500).json({ message: "The post could not be removed" })
        })
    }    
})


module.exports = router