const request = require('request')

const getWeather = (lat, long, callback) => {

    const url = 'http://api.weatherapi.com/v1/current.json?key=d82cf33601ce4bd6a7593812252206&q=' + lat + ',' + long

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Error retrieving weather data')
        } else if (body.length === 0 || !body.current) {
            callback('Invalid location, Please try with proper location')
        } else {

            const { feelslike_c: feelslike, temp_c: temp, humidity } = body.current

            callback(undefined, {
                temp,
                feelslike,
                condition: body.current.condition.text,
                humidity
            })

        }

    })

}

module.exports = getWeather