

const request = require('request')

const geocode=(address,callback)=>{
   
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hyZXlyZXYwMSIsImEiOiJja3B3cjEzdDYwM2dyMm9sb3lnN2J6MzJxIn0.mHQVP4IhcJ4vy3m0tGQ2dA'

    request({url:url, json:true},(error,response)=>{

    if (error) {
        callback('unable to connect to the location service',undefined)
    } else if (response.body.features.length === 0) {
        callback('unable to find the location service.Try another location',undefined)
    }else{
        callback(undefined,{
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name
        })
    }
})
}

module.exports=geocode