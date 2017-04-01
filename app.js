var request = require('request');
var moment = require('moment');
var fs = require('fs');

request('http://api.apixu.com/v1/history.json?key=0bd812b4d4124365ae5153129170104&q=Athlone&dt=2017-03-27', function(err, res, body) {  
    bodyProcessor(body);
});

function appendObject(obj){
  fs.readFile('./config.json', function (err, data) {
    var json = JSON.parse(data)
    json.push(JSON.stringify(obj));

    fs.writeFile("./config.json", json);
})
}





function bodyProcessor(body)
{
  var body = JSON.parse(body);
  //console.log(body.forecast.forecastday)

  var hourArray = body.forecast.forecastday[0].hour
  var forecastday = body.forecast.forecastday[0]
  console.log(hourArray.length);
  var serise = [];
  var tempData = [];
  var windData = [];
  var humidityData =[];

  for(var i in hourArray)
  {

    //console.log(hourArray[i].time_epoch)
    //console.log(moment.unix(hourArray[i].time_epoch).format('LT'))
    var name = moment.unix(hourArray[i].time_epoch).format('LT');
    var y = hourArray[i].temp_c;
    var obj1 ={name, y};
    tempData.push(obj1);

    var name = moment.unix(hourArray[i].time_epoch).format('LT');
    var y = hourArray[i].wind_mph;
    var obj2 ={name, y};
    windData.push(obj2);

    var name = moment.unix(hourArray[i].time_epoch).format('LT');
    var y = hourArray[i].humidity/100;
    var obj3 ={name, y};
    humidityData.push(obj3);

  }

  //console.log(tempData);
  //console.log(windData);
  //console.log(humidityData);


     var object1 = {
                  id: 'temperature'+moment.unix(forecastday.date_epoch).format('DD'),
                  name: 'Temperature deg.C',
                  data: tempData
    }

    var object2 = {
                  id: 'windSpeed'+moment.unix(forecastday.date_epoch).format('DD'),
                  name: 'WindSpeed Mph',
                  data: windData
    }

    var object3 = {
                  id: 'humidity'+moment.unix(forecastday.date_epoch).format('DD'),
                  name: 'Humidity %',
                  data: humidityData
    }

    console.log(object1);
    console.log(object2);
    console.log(object3);

    /*appendObject(object1);
    appendObject(object2);
    appendObject(object3);*/
  /*for (var i in body)
  {
    console.log(body[i]);

  }*/
 

}