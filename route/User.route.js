    

       const express = require("express")

       const userRouter = express.Router()

       const bcrypt = require("bcrypt")

       const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.Model")



       userRouter.post("/register", async(req,res) =>{
            const {name,email,password} = req.body
           
            try{
                bcrypt.hash(password, 5, async(err,hash) =>{

                    if(err){
                        console.log(err)
                        res.send({"msg" : "something wrong"})
                    }else{
                        const userR = new UserModel({name,email, password : hash})
                        await userR.save()
                        res.send({"msg" : "User Registered successfully"})
                    }
                })

            }catch(err){
                  console.log(err)
            }
       })

      userRouter.post("/login", async(req,res) =>{
           const {email,password} = req.body
             try{
                const user = await UserModel.find({email : email})
                if(user.length > 0){
                    bcrypt.compare(password, user[0].password, (err,result) => {

                        if(result){

                            const token = jwt.sign({userID : user[0]._id}, "sau")
                            res.send({"msg" : "Login Successfully", "token":token})
                        }else{
                            res.send({"msg" : "Wrong Credential"})
                        }
                    })
                }else{
                    res.send({"msg" : "Wrong Credential"})
                }
             }catch(err){
                console.log(err)
             }
      })


      userRouter.get("/getProfile/:email", async (req, res) => {
        const email = req.params.email;
        try {
          const user = await UserModel.findOne({ email: email });
      
          if (user) {
            res.send(user);
          } else {
            res.send("invalid");
          }
        } catch (err) {
          console.log(err);
      
          res.send({ error: err });
        }
      });

       module.exports = {userRouter}