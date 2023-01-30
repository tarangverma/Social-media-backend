const User = require('../Models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt')


// DELETE USER
router.delete("/:id" , async (req , res)=> {
   if(req.body.userId === req.params.id) {
      
      try {
         const user = await User.findByIdAndDelete(req.params.id);
         res.status(200).json("User Account has been Deleted Successfully") 
      } catch (error) {
         return res.status(500).json(error)   
      }
   } else 
   return  res.status(403).json("Could not Delete user")
});

// GET A USER
router.get("/:id" , async (req, res)=> {
      try {
         const user = await User.findById(req.params.id)
         const {password , createdAt , updatedAt, ...others} = user._doc
         res.status(200).json(others)
      } catch (error) {
         res.status(502).json("User not found")
      }
})
// FOLLOW A USER
router.put("/:id/follow" , async (req, res)=> {
   if( req.body.userId !== req.params.id) {
      try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
         if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({$push: {followers: req.body.userId}});
            await currentUser.updateOne({$push: {followings: req.params.id}});
            res.status(200).json("User has been Followed")
         } else {
            res.status(400).json("You Already Follow This User")
         }
         
      } catch (error) {
         res.status(403).json(error)
      }
   } else {
      res.status(402).json("You cannot follow yourself"); 
   }
})
// UNFOLLOW A USER

router.put("/:id/unfollow" , async (req, res)=> {
   if( req.body.userId !== req.params.id) {
      try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
         if (user.followers.includes(req.body.userId)) {
            await user.updateOne({$pull: {followers: req.body.userId}});
            await currentUser.updateOne({$pull: {followings: req.params.id}});
            res.status(200).json("User has been Unfollowed")
         } else {
            res.status(400).json("You don't Follow This User")
         }
         
      } catch (error) {
         res.status(403).json(error)
      }
   } else {
      res.status(402).json("You cannot unfollow yourself"); 
   }
});

module.exports = router