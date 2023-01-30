const User = require("../Models/User")
const router = require('express').Router();
const bcrypt = require('bcrypt')

// REGISTER
   router.post("/register" , async (req, res)=> {
      try {
         // generate bcrypt password 
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(req.body.password , salt)

         // Create new user
         const newUser = new User ( {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
         });

         // Save user and create response
         const RegisterUser = await newUser.save();
         res.status(200).json(RegisterUser)
      } catch (error) {
         console.log(error);
      }
   });

   // LOGIN 

   router.post("/login" , async (req , res) => {
       try {
          const loginUser =await User.findOne({email: req.body.email});
          !loginUser && res.status(404).json("User not found !");

          const validPassword = await bcrypt.compare(req.body.password , loginUser.password);
          !validPassword && res.status(400).json("Invalid Password");

          res.status(200).json(loginUser)
       } catch (err) {
         console.log(err);
       }
   })

module.exports = router;