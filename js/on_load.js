// wait until the DOM is loaded before running this
document.addEventListener('DOMContentLoaded', function() {
	// get the current URL parameters
	var urlParams = new URLSearchParams(window.location.search);
	// check if ICAO is included in URL
	var icao = urlParams.get('icao');
	if (icao) {
		getOptimizedPointForecast(icao,'hourly');
	} else {
		getPointForecast('hourly');
	}
})