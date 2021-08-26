function displayOptimizedPointData(data, icao, name) {
    /// initialize graphs
    // clearAllGraphs();
    // change the display text for the weather graphs popup
    // document.getElementById('forecast_point_label').innerHTML = name + ' (' + icao + ')';
    // initialize arrays to store output data:
    var ceiling = [];
    var visibility = [];
    var wind_speed = [];
    var wind_direction = [];
    var air_temperature = [];
    var relative_humidity = [];
    var total_cloud_cover = [];
    var probability_of_fog = [];
    var surface_air_pressure = [];
    var dew_point_temperature = [];
    var eastward_wind_velocity = [];
    var max_temperature_utc_day = [];
    var min_temperature_utc_day = [];
    var northward_wind_velocity = [];
    var precipitation_amount_1hr = [];
    var precipitation_amount_3hr = [];
    var precipitation_amount_6hr = [];
    var max_temperature_local_day = [];
    var min_temperature_local_day = [];
    var probability_of_thunderstorm = [];
    var air_pressure_at_mean_sea_level = [];
    var conditional_probability_of_ice = [];
    var conditional_probability_of_rain = [];
    var conditional_probability_of_snow = [];
    var probability_of_precipitation_1hr = [];
    var probability_of_precipitation_3hr = [];
    var probability_of_precipitation_6hr = [];
    var probability_of_precipitation_24hr = [];

    // check URL parameter to set the temperature scale
    var tempscale = urlParams.get('tempscale');
    if (tempscale == null) {
        tempscale = 'C'
    } else {
        tempscale = tempscale.toUpperCase();
    }
    var precipunits;
    var distanceunits;
    var visunits;
    var speedunits;
    var pressureunits;
    var unitsystem = urlParams.get('units');
    if (unitsystem != null && unitsystem.toLowerCase() == 'imperial') {
        unitsystem = 'imperial';
        precipunits = 'in';
        distanceunits = 'ft';
        visunits = 'miles';
        speedunits = 'knots';
        pressureunits = 'Hg';
        // specify Fahrenheit here as well
        // so `tempscale` can be omitted
        tempscale = 'F';
    } else {
        unitsystem = 'metric';
        precipunits = 'mm';
        distanceunits = 'm';
        visunits = 'm';
        speedunits = 'm/s';
        pressureunits = 'Pa';
    }

    // iterate through the API response data
    // and build the output data structures
    for (var i = 0; i < data.length; i++) {

        var valid_time = data[i].times.valid_time;
        var valid_time_vega_format = get_vega_time(valid_time);

        // add Optimized Point variables

        var ceil = data[i].values.ceiling;
        if (ceil != undefined) {
            ceiling.push({
                'Time': valid_time_vega_format,
                'Value': ceil
            });
        }

        var vis = data[i].values.visibility;
        if (vis != undefined) {
            visibility.push({
                'Time': valid_time_vega_format,
                'Value': parse_visibility(vis, visunits)
            });
        }

        var ws = data[i].values.wind_speed;
        if (ws != undefined) {
            wind_speed.push({
                'Time': valid_time_vega_format,
                'Value': parse_speed(ws, speedunits)
            });
        }

        var wd = data[i].values.wind_direction;
        if (wd != undefined) {
            wind_direction.push({
                'Time': valid_time_vega_format,
                'Value': wd
            });
        }

        var air_temp = data[i].values.air_temperature;
        if (air_temp != undefined) {
            air_temperature.push({
                'Time': valid_time_vega_format,
                'Value': parse_temperature(air_temp, tempscale)
            });
        }

        var rel_hum = data[i].values.relative_humidity;
        if (rel_hum != undefined) {
            relative_humidity.push({
                'Time': valid_time_vega_format,
                'Value': rel_hum
            });
        }

        var tcc = data[i].values.total_cloud_cover;
        if (tcc != undefined) {
            total_cloud_cover.push({
                'Time': valid_time_vega_format,
                'Value': tcc
            });
        }

        var fog = data[i].values.probability_of_fog;
        if (fog != undefined) {
            probability_of_fog.push({
                'Time': valid_time_vega_format,
                'Value': fog
            });
        }

        var sap = data[i].values.surface_air_pressure;
        if (sap != undefined) {
            surface_air_pressure.push({
                'Time': valid_time_vega_format,
                'Value': parse_pressure(sap, pressureunits)
            });
        }

        var dp_temp = data[i].values.dew_point_temperature;
        if (dp_temp != undefined) {
            dew_point_temperature.push({
                'Time': valid_time_vega_format,
                'Value': parse_temperature(dp_temp, tempscale)
            });
        }

        var e_wv = data[i].values.eastward_wind_velocity;
        if (e_wv != undefined) {
            eastward_wind_velocity.push({
                'Time': valid_time_vega_format,
                'Value': parse_speed(e_wv, speedunits)
            });
        }

        var n_wv = data[i].values.northward_wind_velocity;
        if (n_wv != undefined) {
            northward_wind_velocity.push({
                'Time': valid_time_vega_format,
                'Value': parse_speed(n_wv, speedunits)
            });
        }

        var max_temp_utc = data[i].values.max_temperature_utc_day;
        if (max_temp_utc != undefined) {
            max_temperature_utc_day.push({
                'Time': valid_time_vega_format,
                'Value': parse_temperature(max_temp_utc, tempscale)
            });
        }

        var min_temp_utc = data[i].values.min_temperature_utc_day;
        if (min_temp_utc != undefined) {
            min_temperature_utc_day.push({
                'Time': valid_time_vega_format,
                'Value': parse_temperature(min_temp_utc, tempscale)
            });
        }

        var pa_1 = data[i].values.precipitation_amount_1hr;
        if (pa_1 != undefined) {
            precipitation_amount_1hr.push({
                'Time': valid_time_vega_format,
                'Value': parse_precipitation(pa_1, unitsystem)
            });
        }

        var pa_3 = data[i].values.precipitation_amount_3hr;
        if (pa_3 != undefined) {
            precipitation_amount_3hr.push({
                'Time': valid_time_vega_format,
                'Value': parse_precipitation(pa_3, unitsystem)
            });
        }

        var pa_6 = data[i].values.precipitation_amount_6hr;
        if (pa_6 != undefined) {
            precipitation_amount_6hr.push({
                'Time': valid_time_vega_format,
                'Value': parse_precipitation(pa_6, unitsystem)
            });
        }

        var max_temp_local = data[i].values.max_temperature_local_day;
        if (max_temp_local != undefined) {
            max_temperature_local_day.push({
                'Time': valid_time_vega_format,
                'Value': parse_temperature(max_temp_local, tempscale)
            });
        }

        var min_temp_local = data[i].values.min_temperature_local_day;
        if (min_temp_local != undefined) {
            min_temperature_local_day.push({
                'Time': valid_time_vega_format,
                'Value': parse_temperature(min_temp_local, tempscale)
            });
        }

        var air_press_msl = data[i].values.air_pressure_at_mean_sea_level;
        if (air_press_msl != undefined) {
            air_pressure_at_mean_sea_level.push({
                'Time': valid_time_vega_format,
                'Value': parse_pressure(air_press_msl, pressureunits)
            });
        }

        var thunder = data[i].values.probability_of_thunderstorm;
        if (thunder != undefined) {
            probability_of_thunderstorm.push({
                'Time': valid_time_vega_format,
                'Value': thunder
            });
        }

        var ice = data[i].values.conditional_probability_of_ice;
        if (ice != undefined) {
            conditional_probability_of_ice.push({
                'Time': valid_time_vega_format,
                'Value': ice
            });
        }

        var rain = data[i].values.conditional_probability_of_rain;
        if (rain != undefined) {
            conditional_probability_of_rain.push({
                'Time': valid_time_vega_format,
                'Value': rain
            });
        }

        var snow = data[i].values.conditional_probability_of_snow;
        if (snow != undefined) {
            conditional_probability_of_snow.push({
                'Time': valid_time_vega_format,
                'Value': snow
            });
        }

        var prob_precip_1 = data[i].values.probability_of_precipitation_1hr;
        if (prob_precip_1 != undefined) {
            probability_of_precipitation_1hr.push({
                'Time': valid_time_vega_format,
                'Value': prob_precip_1
            });
        }

        var prob_precip_3 = data[i].values.probability_of_precipitation_3hr;
        if (prob_precip_3 != undefined) {
            probability_of_precipitation_3hr.push({
                'Time': valid_time_vega_format,
                'Value': prob_precip_3
            });
        }

        var prob_precip_6 = data[i].values.probability_of_precipitation_6hr;
        if (prob_precip_6 != undefined) {
            probability_of_precipitation_6hr.push({
                'Time': valid_time_vega_format,
                'Value': prob_precip_6
            });
        }

        var prob_precip_24 = data[i].values.probability_of_precipitation_24hr;
        if (prob_precip_24 != undefined) {
            probability_of_precipitation_24hr.push({
                'Time': valid_time_vega_format,
                'Value': prob_precip_24
            });
        }

    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    //// Configure the Color Thresholding for Graphs
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    CUSTOM_THRESHOLDS = false;

    NO_COLOR_THRESHOLDS = {
        'c1': null, // warn threshold value
        'c2': null, // alert threshold value
        'c3': null  // big alert threshold value
    }

    if (fx_airports.indexOf(icao) > -1) {
        // set flag to indicate custom thresholds
        CUSTOM_THRESHOLDS = true;
        // get the location-specific thresholds
        var thresholds = fx_thresholds[icao];
        // parse out the individual thresholds
        var wind_speed_thresholds = fx_wind_speed_thresholds;
        var visibility_thresholds = fx_visibility_thresholds;
        var rel_hum_thresholds = fx_rel_hum_thresholds;
        var ceiling_thresholds = fx_cloud_ceiling_thresholds;
        // not all sites have custom thresholds
        var precip_3hr_thresholds = NO_COLOR_THRESHOLDS;
        var precip_6hr_thresholds = NO_COLOR_THRESHOLDS;
        var max_temp_thresholds = NO_COLOR_THRESHOLDS;
        var min_temp_thresholds = NO_COLOR_THRESHOLDS;
        if (thresholds['max_temp']) {
            precip_3hr_thresholds = thresholds['precipitation_amount_3hr'];
            precip_6hr_thresholds = thresholds['precipitation_amount_6hr'];
            max_temp_thresholds = thresholds['max_temp'];
            min_temp_thresholds = thresholds['min_temp'];
        }
    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    //// Embed the Vega visualizations into the DOM
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    if (air_temperature.length > 0 && wind_speed.length > 0) {
        // add the Ceiling table to the DOM if data exists
        if (ceiling.length > 0) {
            var table = document.createElement('table');
            var caption = document.createElement('caption');
            caption.innerHTML = 'Cloud Ceiling';
            table.appendChild(caption);
            var headers = document.createElement('tr');
            var time = document.createElement('th');
            var value = document.createElement('th');
            time.innerHTML = 'Time<br>(UTC)';
            value.innerHTML = 'Cloud Ceiling<br>(Range)';
            headers.appendChild(time);
            headers.appendChild(value);
            table.appendChild(headers);
            for (var i=0; i < ceiling.length; i++) {
                var data = ceiling[i];
                var row = document.createElement('tr');
                var value = data['Value'];
                var color = '';
                if (CUSTOM_THRESHOLDS) {
                    ceiling_thresholds[value];
                }
                var t = document.createElement('td');
                t.className = color;
                var v = document.createElement('td');
                v.className = color;
                t.innerHTML = data['Time'];
                value = parse_cloud_ceiling(value, distanceunits);
                v.innerHTML = value;
                row.appendChild(t);
                row.appendChild(v);
                table.appendChild(row);
            }
            var ceiling_div = document.getElementById('op_ceiling');
            ceiling_div.innerHTML = '';
            ceiling_div.appendChild(table);
            ceiling_div.style.display = 'block';
        }
        // hide some fields for silent tristero
        if (urlParams.get('version') != 'fx') {
            embed_vega_spec(
                build_vega_spec(
                    '24hr Max. Temperature UTC (' + tempscale + ')',
                    { 'values': max_temperature_utc_day },
                    (CUSTOM_THRESHOLDS ? max_temp_thresholds : NO_COLOR_THRESHOLDS)
                ),
                '#op_max_temp_utc'
            );
            embed_vega_spec(
                build_vega_spec(
                    '24hr Min. Temperature UTC (' + tempscale + ')',
                    { 'values': min_temperature_utc_day },
                    (CUSTOM_THRESHOLDS ? min_temp_thresholds : NO_COLOR_THRESHOLDS)
                ),
                '#op_min_temp_utc'
            );
            embed_vega_spec(
                build_vega_spec(
                    '24hr Max. Temperature Local Time (' + tempscale + ')',
                    { 'values': max_temperature_local_day },
                    (CUSTOM_THRESHOLDS ? max_temp_thresholds : NO_COLOR_THRESHOLDS),
                    'Local' // specify timezone
                ),
                '#op_max_temp_local'
            );
            embed_vega_spec(
                build_vega_spec(
                    '24hr Min. Temperature Local Time (' + tempscale + ')',
                    { 'values': min_temperature_local_day },
                    (CUSTOM_THRESHOLDS ? min_temp_thresholds : NO_COLOR_THRESHOLDS),
                    'Local' // specify timezone
                ),
                '#op_min_temp_local'
            );
            embed_vega_spec(
                build_vega_spec(
                    '24hr Probability of Precipitation (%)',
                    { 'values': probability_of_precipitation_24hr },
                    NO_COLOR_THRESHOLDS,
                ),
                '#op_prob_precip_24'
            );
            embed_vega_spec(
                build_vega_spec(
                    'Surface Air Pressure (' + pressureunits + ')',
                    { 'values': surface_air_pressure },
                    NO_COLOR_THRESHOLDS,
                ),
                '#op_surface_air_press'
            );
        }
        // add the other data variable graphs to the DOM
        embed_vega_spec(
            build_vega_spec(
                'Horizontal Visibility (' + visunits + ')',
                { 'values': visibility },
                (CUSTOM_THRESHOLDS ? visibility_thresholds : NO_COLOR_THRESHOLDS)
            ),
            '#op_visibility'
        );
        embed_vega_spec(
            build_vega_spec(
                'Wind Speed (' + speedunits + ')',
                { 'values': wind_speed },
                (CUSTOM_THRESHOLDS ? wind_speed_thresholds : NO_COLOR_THRESHOLDS)
            ),
            '#op_wind_speed'
        );
        embed_vega_spec(
            build_vega_spec(
                'Wind Direction (degrees)',
                { 'values': wind_direction },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_wind_direction'
        );
        embed_vega_spec(
            build_vega_spec(
                'Air Temperature (' + tempscale + ')',
                { 'values': air_temperature },
                (CUSTOM_THRESHOLDS ? max_temp_thresholds : NO_COLOR_THRESHOLDS),
            ),
            '#op_air_temp'
        );
        embed_vega_spec(
            build_vega_spec(
                'Relative Humidity (%)',
                { 'values': relative_humidity },
                (CUSTOM_THRESHOLDS ? rel_hum_thresholds : NO_COLOR_THRESHOLDS),
            ),
            '#op_rel_hum'
        );
        embed_vega_spec(
            build_vega_spec(
                'Total Cloud Cover (%)',
                { 'values': total_cloud_cover },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_cloud_cover'
        );
        embed_vega_spec(
            build_vega_spec(
                'Probability of Fog (%)',
                { 'values': probability_of_fog },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_prob_fog'
        );
        embed_vega_spec(
            build_vega_spec(
                'Dew Point Temperature (' + tempscale + ')',
                { 'values': dew_point_temperature },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_dew_point_temp'
        );
        // embed_vega_spec(
        //     build_vega_spec(
        //         'Eastward Wind Velocity (' + speedunits + ')',
        //         { 'values': eastward_wind_velocity },
        //         NO_COLOR_THRESHOLDS,
        //     ),
        //     '#op_east_wind_vel'
        // );
        // embed_vega_spec(
        //     build_vega_spec(
        //         'Northward Wind Velocity (' + speedunits + ')',
        //         { 'values': northward_wind_velocity },
        //         NO_COLOR_THRESHOLDS,
        //     ),
        //     '#op_north_wind_vel'
        // );
        embed_vega_spec(
            build_vega_spec(
                '1hr Precipitation Amount (' + precipunits + ')',
                { 'values': precipitation_amount_1hr },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_precip_amt_1'
        );
        embed_vega_spec(
            build_vega_spec(
                '3hr Precipitation Amount (' + precipunits + ')',
                { 'values': precipitation_amount_3hr },
                (CUSTOM_THRESHOLDS ? precip_3hr_thresholds : NO_COLOR_THRESHOLDS),
            ),
            '#op_precip_amt_3'
        );
        embed_vega_spec(
            build_vega_spec(
                '6h Precipitation Amount (' + precipunits + ')',
                { 'values': precipitation_amount_6hr },
                (CUSTOM_THRESHOLDS ? precip_6hr_thresholds : NO_COLOR_THRESHOLDS),
            ),
            '#op_precip_amt_6'
        );
        embed_vega_spec(
            build_vega_spec(
                'Air Pressure at Mean Sea Level (' + pressureunits + ')',
                { 'values': air_pressure_at_mean_sea_level },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_air_press_sea_level'
        );
        embed_vega_spec(
            build_vega_spec(
                'Probability of Thunderstorm (%)',
                { 'values': probability_of_thunderstorm },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_prob_thunder'
        );
        embed_vega_spec(
            build_vega_spec(
                'Conditional Probability of Ice (%)',
                { 'values': conditional_probability_of_ice },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_prob_ice'
        );
        embed_vega_spec(
            build_vega_spec(
                'Conditional Probability of Rain (%)',
                { 'values': conditional_probability_of_rain },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_prob_rain'
        );
        embed_vega_spec(
            build_vega_spec(
                'Conditional Probability of Snow (%)',
                { 'values': conditional_probability_of_snow },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_prob_snow'
        );
        embed_vega_spec(
            build_vega_spec(
                '1hr Probability of Precipitation (%)',
                { 'values': probability_of_precipitation_1hr },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_prob_precip_1'
        );
        embed_vega_spec(
            build_vega_spec(
                '3hr Probability of Precipitation (%)',
                { 'values': probability_of_precipitation_3hr },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_prob_precip_3'
        );
        embed_vega_spec(
            build_vega_spec(
                '6hr Probability of Precipitation (%)',
                { 'values': probability_of_precipitation_6hr },
                NO_COLOR_THRESHOLDS,
            ),
            '#op_prob_precip_6'
        );
    }

    // reset cursor from spinning wheel to default
    document.getElementById('forecast_switch').style.cursor = 'pointer';
    document.body.style.cursor = 'default';
    // make download button visible
    // document.getElementById('download_forecast').style.display = 'block';
}