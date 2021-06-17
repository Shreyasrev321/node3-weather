const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./geocode ')
const forecast = require('./forecast')
const port=process.env.PORT||3000

const pathdirectory =path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../template/views')
const partialspath =path.join(__dirname,'../template/partials')
const app=express()

app.set('views',viewspath)
app.set('view engine','hbs')
app.use(express.static(pathdirectory))
hbs.registerPartials(partialspath)


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Shreyas Revankar'

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helptext:'How can i help you?',
        name:'Shreyas Revankar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'My Info!',
        name:'Shreyas Revankar'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please enter the address'
        })
    }
geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }
    forecast(lattitude,longitude,(error,forecastdata)=>{
        if(error){
           return res.send({error})
        }
        res.send({
            forecast:forecastdata,
            location,
            address:req.query.address
        })
    })
})

    // res.send({
    //     Forecast:'It is snowing!',
    //     Location:'philadelphia',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=> {
    if(!req.query.search){
        res.send({
            error:'you must enter the address!'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shreyas Revankar',
        errormsg:'404 error!page not found!..'
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shreyas Revankar',
        errormsg:'404 error!page not found!..'
    })
})




app.listen(port,()=>{
    console.log('The server is up!'+'port')
})