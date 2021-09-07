let D = null;

let weather = {
    "apiKey": "dea886ab571fa9ba5defd3fe2cb73358",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => {D = data; this.displayWeather(data, 1);});
    },
    displayWeather: function(data, DayNumber) {
        const cityname = data.city.name;
        const country = data.city.country;
        // DAY 1
        let date1 = data.list[0].dt_txt;
        const icon1 = data.list[0].weather[0].icon;
        const description1 = data.list[0].weather[0].description;
        const temp1 = data.list[0].main.temp;
        const humidity1 = data.list[0].main.humidity;
        const speed1 = Math.round((Number(data.list[0].wind.speed) * 3.6) * 100) / 100;
        const pop1 = data.list[0].pop;
        const main1 = data.list[0].weather[0].main;
        // DAY 2
        let date2 = data.list[7].dt_txt;
        const icon2 = data.list[7].weather[0].icon;
        const description2 = data.list[7].weather[0].description;
        const temp2 = data.list[7].main.temp;
        const humidity2 = data.list[7].main.humidity;
        const speed2 = Math.round((Number(data.list[7].wind.speed) * 3.6) * 100) / 100;
        const pop2 = data.list[7].pop;
        const main2 = data.list[7].weather[0].main;
        // DAY 3
        let date3 = data.list[15].dt_txt;
        const icon3 = data.list[15].weather[0].icon;
        const description3 = data.list[15].weather[0].description;
        const temp3 = data.list[15].main.temp;
        const humidity3 = data.list[15].main.humidity;
        const speed3 = Math.round((Number(data.list[15].wind.speed) * 3.6) * 100) / 100;
        const pop3 = data.list[15].pop;
        const main3 = data.list[15].weather[0].main;
        // DAY 4
        let date4 = data.list[23].dt_txt;
        const icon4 = data.list[23].weather[0].icon;
        const description4 = data.list[23].weather[0].description;
        const temp4 = data.list[23].main.temp;
        const humidity4 = data.list[23].main.humidity;
        const speed4 = Math.round((Number(data.list[23].wind.speed) * 3.6) * 100) / 100;
        const pop4 = data.list[23].pop;
        const main4 = data.list[23].weather[0].main;

        let months   = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        function dateList(date) {
            let myarr1 = date.split(" ");
            date = myarr1[0];
            let myArr2 = date.split("-");
            let year = myArr2[0]
            let month = months[Number(myArr2[1])];
            let d = myArr2[2];
            return [d, month, year];
        }

        let arr1 = dateList(date1);
        let d = new Date(`${arr1[0]} ${arr1[1]}, ${arr1[2]}`);

        let arr2 = dateList(date2);
        let dx = new Date(`${arr2[0]} ${arr2[1]}, ${arr2[2]}`);

        let arr3 = dateList(date3);
        let dy = new Date(`${arr3[0]} ${arr3[1]}, ${arr3[2]}`);

        let arr4 = dateList(date4);
        let dz = new Date(`${arr4[0]} ${arr4[1]}, ${arr4[2]}`);

        let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day1 = weekday[d.getDay()];
        let day2 = weekday[dx.getDay()];
        let day3 = weekday[dy.getDay()];
        let day4 = weekday[dz.getDay()];

        function modify(day, arr, icon, temp, desc, pop, humidity, speed) {
            document.querySelector(".Day").innerText = day;
            document.querySelector(".Date").innerText = `${arr[0]} ${arr[1]} ${arr[2]}`;    
            document.querySelector(".Card-1 .part2 img").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".Temp").innerText = Math.round(Number(temp)) + "°C";
            document.querySelector(".Description").innerText = desc;    
            document.querySelector("table tr:nth-child(1) td:nth-child(2)").innerText = pop + " %";
            document.querySelector("table tr:nth-child(2) td:nth-child(2)").innerText = humidity + " %";
            document.querySelector("table tr:nth-child(3) td:nth-child(2)").innerText = speed + " km/h";
        }

        function CardBackground(main) {

            let style = document.querySelector('.Card-1').style;
            if (main == 'Rain') {
                style.setProperty('--background', "url('https://source.unsplash.com/1600x900/?Rain')");
              } else if (main == 'Clouds') {
                style.setProperty('--background', "url('https://source.unsplash.com/1600x900/?Clouds')");
              } else if (main == 'Clear') {
                style.setProperty('--background', "url('https://source.unsplash.com/1600x900/?Sun')");
              } else {
                style.setProperty('--background', "url('https://source.unsplash.com/1600x900/?" + main +"')");
            }            
        }

        switch(DayNumber) {
            case 1:
                modify(day1, arr1, icon1, temp1, description1, pop1, humidity1, speed1);
                CardBackground(main1);
                break;
            case 2:
                modify(day2, arr2, icon2, temp2, description2, pop2, humidity2, speed2);
                CardBackground(main2);
                break;
            case 3:
                modify(day3, arr3, icon3, temp3, description3, pop3, humidity3, speed3);
                CardBackground(main3);
                break;
            case 4:
                modify(day4, arr4, icon4, temp4, description4, pop4, humidity4, speed4);
                CardBackground(main4);
                break;

        }

        // modifications common to all 4 days
        document.querySelector(".City").innerText = cityname + ", " + country;
        document.querySelector(".One img").src = "https://openweathermap.org/img/wn/" + icon1 + ".png";
        document.querySelector("#d1").innerText = day1.substr(0, 3);
        document.querySelector("#t1").innerText = Math.round(Number(temp1)) + "°C";

        document.querySelector(".Two img").src = "https://openweathermap.org/img/wn/" + icon2 + ".png";
        document.querySelector("#d2").innerText = day2.substr(0, 3);
        document.querySelector("#t2").innerText = Math.round(Number(temp2)) + "°C";

        document.querySelector(".Three img").src = "https://openweathermap.org/img/wn/" + icon3 + ".png";
        document.querySelector("#d3").innerText = day3.substr(0, 3);
        document.querySelector("#t3").innerText = Math.round(Number(temp3)) + "°C";

        document.querySelector(".Four img").src = "https://openweathermap.org/img/wn/" + icon4 + ".png";
        document.querySelector("#d4").innerText = day4.substr(0, 3);
        document.querySelector("#t4").innerText = Math.round(Number(temp4)) + "°C";

        document.querySelector(".Card").classList.remove("Loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + cityname +"')"
    },

    search: function() {
        this.fetchWeather(document.querySelector(".Searchbar").value);
    },

};

document.querySelector(".Search button").addEventListener("click", function() { weather.search(); });
document.querySelector(".Searchbar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

document.querySelector(".One").addEventListener("click", function() { weather.displayWeather(D , 1) });
document.querySelector(".Two").addEventListener("click", function() { weather.displayWeather(D , 2) });
document.querySelector(".Three").addEventListener("click", function() { weather.displayWeather(D , 3) });
document.querySelector(".Four").addEventListener("click", function() { weather.displayWeather(D , 4) });

weather.fetchWeather("Paris");