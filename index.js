const http =require("http");
const fs=require("fs");
var requests = require('requests');
const file=fs.readFileSync("Home.html","utf-8");
const repalceVal=(tempVal,orgVal)=>{
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    return temperature;
};

const server=http.createServer((req,res)=>{
    if(req='/'){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=52146de5c92a9f1659b518518a5bae68")
.on('data',(chunk)=> {
    const objdata=JSON.parse(chunk);
    const currdata=[objdata];
 const realTimedata=currdata.map((val)=>repalceVal(file,val)).join("");
 res.write(realTimedata);
})
.on('end', (err) =>{
  if (err) return console.log('connection closed due to errors', err);
  res.end();
});

    }
});
server.listen(8000,"127.0.0.1");