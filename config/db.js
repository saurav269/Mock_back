   

      const mongoose = require("mongoose")


      const connection = mongoose.connect("mongodb+srv://sauravmallik786:mallik@cluster0.oapdvsf.mongodb.net/?retryWrites=true&w=majority")

      module.exports = {connection}