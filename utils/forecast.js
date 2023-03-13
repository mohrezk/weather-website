const request = require('request')


// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before) 

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b060b6695a998699b0b8a6f30b3f76f3&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({ url, json:true }, (error, { body }) => {
        if(error){
            callback("Unable to conect to weather service!", undefined)
        }
        else if(body.error){
            callback("Unable to find location", undefined)
        }
        else{
            data = {
                weather: body.current.weather_descriptions[0],
                current:  body.current.temperature,
                feelslike: body.current.feelslike
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast