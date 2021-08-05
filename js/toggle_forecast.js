// turn off all other switches
function switchChange(evt, elem) {
	if (elem == null) {
		elem = evt.target;
	}
	// get the current URL parameters
	var urlParams = new URLSearchParams(window.location.search);
	// check if ICAO is included in URL
	var icao = urlParams.get('icao');
	// change cursor to indicate something is happening
	elem.style.cursor = 'progress';
	document.body.style.cursor = 'progress';
	if (elem.checked) {
		document.getElementById('day').className = 'selected';
		document.getElementById('week').className = '';
		if (icao) {
			getOptimizedPointForecast(icao, 'short_range_high_freq');
		} else {
			getPointForecast('short_range_high_freq');
		}
	} else {
		document.getElementById('day').className = '';
		document.getElementById('week').className = 'selected';
		if (icao) {
			getOptimizedPointForecast(icao, 'medium_range_std_freq');
		} else {
			getPointForecast('medium_range_std_freq');
		}
	}
}

// handle switch toggle text clicks
// var handler = function (e) {
// 	e.preventDefault();
// 	var elem = document.getElementById('forecast_switch');
// 	elem.checked = !elem.checked;
// 	switchChange(null, elem);
// };

// add event listeners when document is loaded
document.addEventListener('DOMContentLoaded', function() {
	// var day = document.getElementById('day');
	// day.addEventListener( 'click', handler, false );
	// day.addEventListener( 'touchstart', handler, false );
	// var week = document.getElementById('week');
	// week.addEventListener( 'click', handler, false );
	// week.addEventListener( 'touchstart', handler, false );
	document.getElementById('forecast_switch').addEventListener( 'change', switchChange, false );
});