;~function(){
	// 带选项页面的扩展
	var city = localStorage.city || '南京',
		textCity = document.getElementById('text-city'),
		btnSave = document.getElementById('btn-save');

	function changeCity(){
		var tempCity = textCity.value;

		ajaxFn({
	        url: 'http://api.k780.com:88/',
	        paraData: 'app=weather.future&weaid=1&&appkey=18524&sign=33461eb8474c8317d0864da952cf4671&format=json&weaid=' + tempCity,
	        callback: function(data) {
	            if(JSON.parse(data).success === "0" && JSON.parse(data).msg === "不存在的气象城市编号"){
	                alert(JSON.parse(data).msg);
	                return;
	            }
	            localStorage.city = textCity.value;
	        }
	    })
	}

	btnSave.addEventListener('click', changeCity, false);

	document.addEventListener('keyup', function(e) {
	    if(e.keyCode == 13){
	        changeCity();
	    }
	}, false);
}()

