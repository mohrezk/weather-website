const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=0f8bbe1542d16e4092e611538a05603e&query='+encodeURIComponent(address)+'&country_module=1'

    request({ url, json: true }, (error, { body } = {} ) => {
        if(error){
            callback("Unable to connect to location services!", undefined)
        }
        else if(!body.data){
            callback("Unable to find location!", undefined)
        }
        else{

            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                official_name: body.data[0].country_module.official_name,
                // flag: response.body.data[0].country_module.flag
            })
        }
    })
}


module.exports =  geocode 