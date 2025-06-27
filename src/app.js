const path = require('path') // core node module not npm package
const express = require('express')
const hbs = require('hbs')
const getGeoCodes = require('./utils/geoCode')
const getWeather = require('./utils/weather')

const app = express()

//Define Paths to Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory for Express
app.use(express.static(publicPath)) //With this change, by default home page displayed will be index.html

// Setup Handlebars Engine and views location
app.set('view engine', 'hbs') //this expects views folder in root with .hbs files in it
app.set('views', viewsPath) // this is to set to a path to a folder other than default views folder, here templates folder
hbs.registerPartials(partialsPath) // to register partials

app.get('', (req, res) => {

    res.render('index', {
        title: 'Home',
        greeting: 'Welcome to node.js',
        user: 'Sudarshan Reddy'
    }) // render accesses .hbs in views folder // now index.html in public folder can be deleted
    // 2nd parameter is an object which can be accesible to index.hbs which makes it dynamic
    // in .hbs these are accessed by double curly braces {{greeting}}
})

app.get('/about', (req, res) => {
    res.render('about', {
        about: 'NodeJS Training',
        user: 'Sudarshan Reddy',
        title: 'About'

    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        user: 'Sudarshan Reddy',
        title: 'Help'
    })


})

//Help related Article not found
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        textMsg: "404 - Help Article not found",
        user: 'Sudarshan Reddy'
    })
})


//Query String Access
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must enter search term.'
        })
    }

    getGeoCodes(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error //error: error
            })
        }

        getWeather(latitude, longitude, (error, { temp, feelslike, condition } = {}) => {
            if (error) {
                return res.send({
                    error 
                })
            }

            return res.send({
                forecast: condition + ' with a temperature of ' + temp + ', but it feels like ' + feelslike,
                location: location,
                address: req.query.address
            })

        })
    })

})

//Page not found at the last 404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        textMsg: "404 - Page not found",
        user: 'Sudarshan Reddy'
    })
})


//Server is Up
app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})
