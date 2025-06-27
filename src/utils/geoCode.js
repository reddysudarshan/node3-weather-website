const request = require('request')

const getGeoCodes = (address, callback) => {

    const url = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address) + '&api_key=6857e280bffb4759364884oim4787bc'

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Error getting GeoCodes');
        } else if (body.length === 0) {
            callback('No such location. Pls change and try again!')
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name
            })

        }
    })
}


module.exports = getGeoCodes