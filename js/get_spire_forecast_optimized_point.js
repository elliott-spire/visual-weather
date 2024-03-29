// // check for authentication to the Optimized Point Forecast API;
// // show the airport map icons and UI button if auth is good
// function test_optimized_point_api() {
//     var uri = 'https://api.wx.spire.com/forecast/point/optimized?location=KLAX';
//     // print the full API request to the JS console
//     console.log('Testing auth to Optimized Point API: GET', uri);
//     // build the HTTP header for Authorization
//     var auth_header = {'spire-api-key': urlParams.get('token')};
//     // make the API request with the specified auth header
//     fetch(uri, {headers: auth_header})
//         .then((resp) => {
//             if (resp.status != 200) {
//                 window.optimized_point = false;
//             } else {
//                 window.optimized_point = true;
//                 // initialize Airports dataset
//                 addAirportsToMap();
//                 // show button that allows user to hide airport icons
//                 document.getElementById('toggleAirports').style.display = 'inline-block';
//             }
//         })
// }

// make an Optimized Point Forecast API request
// and generate UI graphs from the response data
function getOptimizedPointForecast(icao, time_bundle) {
    // build the route for the API call using the `lat` and `lon` URL parameters
    var uri = 'https://api.wx.spire.com/forecast/point/optimized?bundles=basic&location=' + icao;
    uri += '&time_bundle=' + time_bundle;
    // print the full API request to the JS console
    console.log('Spire Weather API: GET', uri);
    // build the HTTP header for Authorization
    var auth_header = {'spire-api-key': urlParams.get('token')};
    // make the API request with the specified auth header
    fetch(uri, {headers: auth_header})
        .then((rawresp) => {
            // return the API response JSON
            // when it is received
            return rawresp.json();
        })
        .then((response) => {
            // set the airport_feature_id variable for clarity
            var airport_feature_id = icao;
            // print the API response to the JS console
            console.log('Weather API Response:', response);
            // reset cursor from spinning wheel to default
            document.body.style.cursor = 'default';
            // check if the API returned any errors or faults
            if (response['errors']) {
                // pass OpenLayers airport feature ID to error handler
                handleErrorResponse(airport_feature_id);
                // do not proceed with this response handler
                return;
            }
            if (response['fault']) {
                // pass OpenLayers airport feature ID to fault handler
                handleFaultResponse(airport_feature_id);
                // do not proceed with this response handler
                return;
            }
            // store the original API response
            window.forecast_data = [
                [icao, response]
            ];
            // get data for the specified time bundle
            var display_data = response.data;
            // get the airport's name from the OpenLayers feature
            var airport_name = display_data[0]['location']['name'];
            var lat = display_data[0]['location']['coordinates']['lat'];
            var lon = display_data[0]['location']['coordinates']['lon'];
            var issuance_time = display_data[0]['times']['issuance_time'];
            // strip seconds and timezone
            issuance_time = issuance_time.split(':00+')[0].replace('T',' ') + ' UTC';
            // display in the UI
            document.getElementById("forecast_loc_name").innerHTML = airport_name + ' (' + icao + ')';
            document.getElementById("forecast_point_coords").innerHTML = 'Latitude: ' + lat + '<br>Longitude: ' + lon;
            document.getElementById("forecast_issuance_time").innerHTML = 'Forecast Issuance: ' + issuance_time;
            // show the forecast data in popup graphs
            displayOptimizedPointData(display_data, airport_feature_id, airport_name);
            // reset forecast toggle button to not be active
            // document.getElementById('requestForecast').className = '';
        });
    // end of Promise for fetch
}

// handle an API response with 'errors' field
function handleErrorResponse(airport_feature_id) {
    // assume invalid API key and prompt re-entry
    // notify the user that the API response failed
    alert('API request failed for the Weather Point API.\nPlease enter a valid API key or contact cx@spire.com');
    // deselect airport feature
    window.selectedAirport = null;
}
// handle an API response with 'fault' field
function handleFaultResponse(airport_feature_id) {
    // this is likely a rate-limit error...
    // TODO: figure out what to do about that
    // deselect forecast feature
    window.selectedAirport = null;
}