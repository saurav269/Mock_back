  


   const express = require("express");



   const calculateRouter = express.Router();
   
   
   calculateRouter.post("/", (req, res) => {
       const { Annual,Rate,Years  } = req.body;
   
     let Return= Math.floor(Annual * [((1 + Rate)^Years - 1) / Rate])
   let invested=Annual*Years
   
   let gain_interest=Math.abs(invested-Return)
     res.send({
       "Maturity":Return,
       "Invested":invested,
       "Ineterest":gain_interest
     })
   
     });
   
     module.exports={
       calculateRouter
     }