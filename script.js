let body = document.querySelector("body")
let input = document.querySelector("input");
let btn = document.querySelector("button");
let tem = document.querySelector("h1");
let city = document.querySelector("h2");
let condition = document.querySelector("#con");
let feelTem = document.querySelector("#feelTem")
let minTem = document.querySelector("#min")
let maxTem = document.querySelector("#max")
let humi = document.querySelector("#humi")
let wind = document.querySelector("#windy")
let sunrise = document.querySelector("#sunrise")
let sunset = document.querySelector("#sunset")



let key = "7f29eea1fa815e3f7861fd72b37436a3";
let key2 = "06fd0eaa161b2d21d1951a81b9c485b4"

async function call() {
  let cityName = input.value;
  city.innerText = input.value
  try {
    let URL = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},IN&limit=2&appid=7f29eea1fa815e3f7861fd72b37436a3`,
    );
    let data = await URL.json();
    console.log(data);
    let lat = data[0].lat
    let lon = data[0].lon
   
   async function getTem (){
   let URL2 = await fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=06fd0eaa161b2d21d1951a81b9c485b4&units=metric`)
   let data = await URL2.json();
   console.log(data)
   tem.innerText = data.list[1].main.temp;
   condition.innerText = data.list[1].weather[0].main
   feelTem.innerText = "feels like"+" "+data.list[0].main.feels_like
   minTem.innerText = "L"+" "+ data.list[1].main.temp_min
   maxTem.innerText = "H"+" "+ data.list[1].main.temp_max
   humi.innerText = "humidity"+" "+ data.list[1].main.humidity
   wind.innerText = "wind speed"+" "+ data.list[1].wind.speed

   
   sunrise.innerText = new Date(data.city.sunrise * 1000).toLocaleTimeString();
   sunset.innerText = new Date(data.city.sunset * 1000).toLocaleTimeString();
}
getTem()
  } catch (error) {
    console.log("city not found", error);
  }
  input.value = "";
}





btn.addEventListener("click", () => {
  call();
});
