
;~function(){
    function joinHtml(data) {
        var data = JSON.parse(data),
            todayHtml = '',
            weekHtml = '';

        todayHtml += '<div class="today-item city">';
        todayHtml +=    '<p class="city-name">' + data.result[0].citynm + '</p>';
        todayHtml +=    '<p class="temperature-num">' + data.result[0].temperature.replace(/\//, '~') + '</p>';
        todayHtml += '</div>';
        todayHtml += '<div class="today-item time">';
        todayHtml +=    '<p class="time-date">' + data.result[0].days + '</p>';
        todayHtml +=    '<p class="time-day">' + data.result[0].week + '</p>';
        todayHtml += '</div>';
        todayHtml += '<div class="today-item weather">';
        todayHtml +=    '<p class="weather-sign"></p><img src="' + data.result[0].weather_icon + '" alt="">';
        todayHtml +=    '<p class="weather-keyword">' + data.result[0].weather + '</p>';
        todayHtml += '</div>';
        todayHtml += '<div class="today-item wind">';
        todayHtml +=    '<p class="wind-direction">' + data.result[0].wind + '</p>';
        todayHtml +=    '<p class="wind-strong">' + data.result[0].winp + '</p>';
        todayHtml += '</div>';

        weekHtml += '<table width="100%">';
        for(var i = 1; i < data.result.length; i += 1){
            weekHtml += '<tr class="forecast-item">';
            weekHtml +=    '<td>' + data.result[i].days + '</td>';
            weekHtml +=    '<td>' + data.result[i].week + '</td>';
            weekHtml +=    '<td>' + data.result[i].weather + '</td>';
            weekHtml +=    '<td>' + data.result[i].temperature.replace(/\//, '~') + '</td>';
            weekHtml +=    '<td>' + data.result[i].wind + '<br/>' + data.result[i].winp + '</td>';
            weekHtml += '</tr>';
        }
        weekHtml += '</table>';

        document.querySelector('.forecast-today').innerHTML = todayHtml;
        document.querySelector('.forecast-week').innerHTML = weekHtml;
    }

    ajaxFn({
        url: 'http://api.k780.com:88/',
        paraData: 'app=weather.future&weaid=1&&appkey=30783&sign=ab14edc289d3364f7ec395dae2684e54&format=json&weaid=' + (localStorage.city || '南京'),
        callback: function(data) {
            chrome.browserAction.setTitle({
                title: '天气预报-' + localStorage.city
            });
            document.querySelectorAll('.loading-tips')[0].style.display = 'none';
            joinHtml(data);
        }
    })

    chrome.browserAction.setBadgeBackgroundColor({color: '#0000ff'});
    chrome.browserAction.setBadgeText({text: 'yix'});
}()