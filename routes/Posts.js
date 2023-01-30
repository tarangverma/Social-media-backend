const Post = require('../Models/Post');
const router = require('express').Router();

// CREATE A POST
router.post("/" , async (req, res)=> {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})
// DELETE A POST
router.delete("/:id", async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
         await post.deleteOne()
            res.status(200).json("Successfully Deleted")
        } else {
            res.status(400).json("Cannot Delete Others Post")
        } 
    } catch (error) {
        res.status(404).json(error);
    }
})
// GET A POST 

module.exports = router
