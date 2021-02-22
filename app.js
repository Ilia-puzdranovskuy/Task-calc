let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let path = require("path");
let cookieParser = require('cookie-parser');
var port = process.env.PORT || 3000;
let app = express();

app.set("view engine","ejs");
app.use(cookieParser('secret key'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

let banks = require("./routes/banks");
let calculator = require("./routes/calculator");


app.use(banks);
app.use(calculator);

async function start(){
    try {
        await mongoose.connect('mongodb+srv://qqqq:qqqq@cluster0.m78pf.mongodb.net/qqqq?retryWrites=true&w=majority',{
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(port);
        console.log("server work ");
    }
    catch (e){
        console.log(e);
    }
};
start();