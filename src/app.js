const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("../utils/geocode")
const forecast = require('../utils/forecast')
const { off } = require('process')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// set up handle bars == hbs 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))
 

app.get('', (req, res) => {
    res.render('index', { title: 'Weather', name: "Mohamed Rezk" })
})

app.get('/about', (req, res) => {
    res.render('about', { name: "Mohamed", title:"About" })
})

app.get('/help', (req, res) => {
    res.render('help', { title: "Weather", title:"Help" })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, official_name } = {} ) => {
        if( error ){
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if( error){
                return res.send({ error })
            }
            res.send({
                official_name,
                forecastData
            })
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
    }
    else{
        console.log(req.query)
        res.send({
            products: []
        })
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
    
        title: "404",
        message: "Help article not found"
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        
        title: "404",
        message: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})