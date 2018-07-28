const express=require('express');
const orm=require('./model');
const cookieParse=require('cookie-parser');
const app=express();
app.use(function (req,res,next) {

})
app.get('/',function (req,res) {
    res.send('nmsl')
})
app.listen(3005)