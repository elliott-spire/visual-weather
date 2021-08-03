function parse_temperature(data, tempscale) {
    var temp;
    var temp_kelvin = data;
    if (tempscale == 'F') {
        temp = (temp_kelvin - 273.15) * 9/5 + 32; // Kelvin to Fahrenheit
    } else if (tempscale == 'K') {
        temp = temp_kelvin; // Kelvin
    } else {
        temp = temp_kelvin - 273.15; // Kelvin to Celsius
    }
    return temp.toFixed(2);
}

function parse_speed(data, units) {
    if (units == 'knots') {
        data = data * 1.944; // m/s to knots
    }
    return data.toFixed(2);
}

function parse_distance(data, units) {
    if (units == 'ft') {
        data = data * 3.281; // m to ft
    }
    return data.toFixed(2);
}

function parse_visibility(data, units) {
    if (units == 'miles') {
        data = data * 3.281; // m to ft
        data = data / 5280.0; // ft to miles
    }
    return data.toFixed(2);
}

function parse_pressure(data, units) {
    if (units == 'Hg') {
        data = data / 3386.0; // Pa to Hg
    }
    return data.toFixed(2);
}

function parse_precipitation(data, units) {
    // if (units == 'lb/sqft') {
    //     data = data * 0.204816; // kg/m2 to lb/sqft
    // }
    if (units == 'imperial') {
        // kg/m2 = mm for liquid precipitation
        // so here we convert from mm to in
        data = data / (25.4);
    }
    return data.toFixed(2);
}

function parse_cloud_ceiling(data, units) {
    if (data == 'none') {
        return data;
    }
    if (units == 'ft') {
        // var ft = [100, 500, 1000, 3000, 5500, 12000]
        var values = {
            "0-30 m": {
                "min": 0,
                "max": 100 //   98.43   // 30 * 3.281
            },
            "30-60 m": {
                "min": 100,
                "max": 200 //   196.86
            },
            "60-152 m": {
                "min": 200,
                "max": 500 //   498.712
            },
            "152-304 m": {
                "min": 500,
                "max": 1000 //  997.424
            },
            "304-944 m": {
                "min": 1000,
                "max": 3100 //  3097.264
            },
            "944-1676 m": {
                "min": 3100,
                "max": 5500 //  5498.956
            },
            // ">1676- m": "none" // no ceiling
        }
        if (values[data]) {
            var min = values[data]["min"];
            var max = values[data]["max"];
        } else {
            var min = 5500;
            var max = 12000;
        }
        data = String(min) + '-' + String(max) + ' ft';
    }
    return data;
}

// get wind (or ocean currents) speed from U and V velocity components
function get_speed_from_u_v(u, v) {
    return Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2))
}

// get wind (or ocean currents) direction from U and V velocity components
function get_direction_from_u_v(u, v) {
    // Meteorological wind direction
    //   90° corresponds to wind from east,
    //   180° from south
    //   270° from west
    //   360° wind from north.
    //   0° is used for no wind.
    if ((u, v) == (0.0, 0.0)) {
        return 0.0
    } else {
        return (180.0 / Math.PI) * Math.atan2(u, v) + 180.0;
    }
}

// subtract previous data value from current value
// since raw value is accumulated over all time
// and we want each bar in the graph to be the value for that time window only
function parse_accumulated_value(data, name, i) {
    var curval;
    if (i != 0) {
        var previous = data[i - 1].values[name];
        curval = data[i].values[name] - previous;
    } else {
        curval = data[i].values[name];
    }
    return curval;
}