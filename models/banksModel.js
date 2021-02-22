const {Schema ,model}= require("mongoose");

const schema = new Schema({
   name:{
    type: String,
    minLength: 1,
    maxLength: 20
   },
   interestRate:{
    type: Number,
    min: 1
   },
   maximumLoan:{
      type: Number,
      min: 1
     },
   minimumDownPayment:{
      type: Number,
      min: 1
   },
   loanTerm:{
      type: Number,
      min: 1
   },
   cookies:{
      type: String
   }
});

module.exports = model("Banks", schema);