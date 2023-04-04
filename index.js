

     const express = require("express")
const { connection } = require("./config/db")
const { Authenticate } = require("./middlewares/Authenticate.middleware")
const { userRouter } = require("./route/User.route")

const cors = require("cors")
const { calculateRouter } = require("./route/Calculate.route")

     const app = express()

     app.use(cors())

     app.use(express.json())
  
      app.use("/users", userRouter)

      app.use('/calculate', calculateRouter)

      app.use(Authenticate)

     app.listen(7700, async() =>{

        try{   
            await connection
            console.log("Server is running on port 7700")
        }catch(err){
            console.log(err)
        }

     })
