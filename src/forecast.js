const request= require('request')


const forecast=(latitude,longitude,callback)=>{
    const Url='http://api.weatherstack.com/current?access_key=d397b9add1d86be049f4ce5c4e512621&query='+latitude+','+longitude+'&units=m'


    request({url:Url,json:true}, (error,response)=>{
        if(error){
            callback('',undefined)
        } else if (response.body.error){
            callback('hello', undefined)
        }else{
            callback(undefined,  ("current temperature "+response.body.current.temperature+" degree. but it feels like "+response.body.current.feelslike+" degree")) 
               
        }
        
    })

}

module.exports=forecast