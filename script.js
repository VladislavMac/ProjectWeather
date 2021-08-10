let CityName   = document.querySelector('.city-name');
let inpCity    = document.querySelector('.inpCity');
let icon       = document.querySelector('.icon');
let des        = document.querySelector('.description');
let temp       = document.querySelector('.temp')
let country    = document.querySelector('.country');

let typingTimer;                //timer identifier
let doneTypingInterval = 1000;  //time in ms (1 seconds)

// запуск функции после остановки ввода в input
inpCity.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (inpCity.value) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
});

function doneTyping ()
{
    /* тело функции */
    let val = inpCity.value
    let save = '';
    // console.log(val.length) test

    if( val.length >= 3 ){
        // console.log(val)

        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + val + '&appid=0e261e518672ac93c76ea3174c7eab7e')
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                console.log(data);
                country.innerHTML  = data.sys.country;
                CityName.innerHTML = data.name;
                icon.innerHTML     = `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`
                temp.innerHTML     = Math.round(data.main.temp - 273) + '&deg;';
                des.innerHTML      = data.weather[0].main
            })
            .catch(function() {
                CityName.innerHTML = 'Город/Страна не найден(а)';
                country.innerHTML  = 'country';
                icon.innerHTML     = 'icon';
                temp.innerHTML     = 'C&deg;';
                des.innerHTML      = 'description';
            });

        }
        // save inp value
        save = inpCity.value;
        inpCity.value = '';

        // for animation loading
        if( inpCity.value == '' )
        {
            let cssload = document.querySelector('.cssload-loader');
            while(cssload.firstChild)
            {
                cssload.removeChild(cssload.firstChild);
            }
        }

        // save inp value
        document.querySelector('.saveButton').onclick = function click()
        {
            inpCity.value = save;    
        }
        
    }; // 1 сек
