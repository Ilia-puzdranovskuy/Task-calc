const {Router} = require("express");
const router = Router();
const banksDB = require("../models/banksModel");

let calcResult = " ";

router.get("/calculator", async (req,res)=>{
    const banks = await banksDB.find({cookies:req.cookies._ga});
    res.render("calculatorPage",{banks,calcResult});
});

router.post("/calculate-mortgage", async (req,res)=>{
    console.log(req.body);
    if(req.body.bankId!=''){
        const banks = await banksDB.findOne({_id:req.body.bankId});
        let initialLoan = req.body.initialLoan, //P сума позики
            downPayment = req.body.downPayment  // поч внесок
        
        if(initialLoan <= banks.maximumLoan){
            if(downPayment >= banks.minimumDownPayment){
                let i  = banks.interestRate/100/12
                let n = Math.pow(1+i,banks.loanTerm);
                
                let mounthlyPayment = initialLoan*(i*n)/(n-1);
               
                let overPayment = (mounthlyPayment*banks.loanTerm)-initialLoan;
                
                calcResult = {
                    bankInf : banks,
                    initialLoan : initialLoan,
                    downPayment : Number(downPayment),
                    mounthlyPayment : Number(mounthlyPayment),
                    overpayment : overPayment
                }
                
            }else{
                calcResult = "Занадто малий початковий внесок!";
            }
           
        }else{
            calcResult = "Ви перевисили максимальну суму позики!";
        }
        
        
            
    
    
    }else{
        calcResult = "Виберіть банк!";
    }
    res.redirect("/calculator")
});


module.exports = router;