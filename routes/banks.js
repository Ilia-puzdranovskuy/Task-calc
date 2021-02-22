const {Router} = require("express");
const router = Router();
const banksDB = require("../models/banksModel");

router.get("/", async (req,res)=>{
    const banks = await banksDB.find({cookies:req.cookies._ga});
    res.render("banksPage",{banks});
    
});

router.post("/create-bank", async (req,res)=>{
    const banks = new banksDB({
        name: req.body.bankName,
        interestRate:req.body.interestRate,
        maximumLoan:req.body.maximumLoan,
        minimumDownPayment:req.body.minimumDownPayment,
        loanTerm:req.body.loanTerm,
        cookies:req.cookies._ga
    });
    await banks.save();
    
    res.redirect("/");
});

router.post("/delete-bank", async (req,res)=>{
   console.log(req.body)
    const banks = await banksDB.findById(req.body.deleteBankId);
   
    await banks.deleteOne();
   
    res.redirect("/")
});

router.post("/change-bank", async (req,res)=>{
    const banks = await banksDB.findById(req.body.changeBankId);
    
    banks.name = req.body.bankName;
    banks.interestRate = req.body.interestRate;
    banks.maximumLoan = req.body.maximumLoan;
    banks.minimumDownPayment = req.body.minimumDownPayment;
    banks.loanTerm = req.body.loanTerm;
    
   
    await banks.save();
   
    res.redirect("/")
});



module.exports = router;