var c3 = 'red'; 	// "Warning"
var c2 = 'orange';	// "Alert"
var c1 = 'yellow';	// "Min"
/////////////////////
var fx_airports = ["KMEM","KIND","KEWR","KGSO","PANC","KAFW","LFPG","EDDK","OMDB","ZGGG","ZSPD","RJBB"];
//////////////////
// shared thresholds
var fx_wind_speed_thresholds = {
	'c3': 40, // knots
	'c2': 30,
	'c1': 25
}
var fx_visibility_thresholds = {
	'c3': 0.5, // miles     // 2640 ft
	'c2': 1.0,              // 5280 ft
	'c1': 2.0,              // 3500 ft
	'minimum_thresholds': true
}
// distinct thresholds
var fx_thresholds = {
	'KMEM': {
		'ceiling': {
			'c3': 300,
			'c2': 800,
			'c1': 1500
		},
		'precipitation_amount_3hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'precipitation_amount_6hr': { // inches
			'c3': 3,
			'c2': 2,
			'c1': 1
		},
		'max_temp': { // fahrenheit
			'c3': 110,
			'c2': 105,
			'c1': 100
		},
		'min_temp': { // fahrenheit
			'c3': 15,
			'c2': 20,
			'c1': 25,
			'minimum_thresholds': true
		}
	},
	'KIND': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'precipitation_amount_6hr': { // inches
			'c3': 3,
			'c2': 2,
			'c1': 1
		},
		'max_temp': { // fahrenheit
			'c3': 105,
			'c2': 100,
			'c1': 95
		},
		'min_temp': { // fahrenheit
			'c3': 5,
			'c2': 10,
			'c1': 15,
			'minimum_thresholds': true
		}
	},
	'KEWR': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'precipitation_amount_6hr': { // inches
			'c3': 3,
			'c2': 2,
			'c1': 1
		},
		'max_temp': { // fahrenheit
			'c3': 105,
			'c2': 100,
			'c1': 95
		},
		'min_temp': { // fahrenheit
			'c3': 10,
			'c2': 15,
			'c1': 20,
			'minimum_thresholds': true
		}
	},
	'KGSO': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'precipitation_amount_6hr': { // inches
			'c3': 3,
			'c2': 2,
			'c1': 1
		},
		'max_temp': { // fahrenheit
			'c3': 110,
			'c2': 105,
			'c1': 100
		},
		'min_temp': { // fahrenheit
			'c3': 15,
			'c2': 20,
			'c1': 25,
			'minimum_thresholds': true
		}
	},
	'PANC': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 1,
			'c2': 0.5,
			'c1': 0.25
		},
		'precipitation_amount_6hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'max_temp': { // fahrenheit
			'c3': 85,
			'c2': 80,
			'c1': 75
		},
		'min_temp': { // fahrenheit
			'c3': -10,
			'c2': -5,
			'c1': 0,
			'minimum_thresholds': true
		}
	},
	'KAFW': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'precipitation_amount_6hr': { // inches
			'c3': 3,
			'c2': 2,
			'c1': 1
		},
		'max_temp': { // fahrenheit
			'c3': 110,
			'c2': 105,
			'c1': 100
		},
		'min_temp': { // fahrenheit
			'c3': 15,
			'c2': 20,
			'c1': 25,
			'minimum_thresholds': true
		}
	},
	'LFPG': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 1,
			'c2': 0.5,
			'c1': 0.25
		},
		'precipitation_amount_6hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'max_temp': { // fahrenheit
			'c3': 100,
			'c2': 95,
			'c1': 90
		},
		'min_temp': { // fahrenheit
			'c3': 15,
			'c2': 20,
			'c1': 25,
			'minimum_thresholds': true
		}
	},
	'EDDK': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 1,
			'c2': 0.5,
			'c1': 0.25
		},
		'precipitation_amount_6hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'max_temp': { // fahrenheit
			'c3': 100,
			'c2': 95,
			'c1': 90
		},
		'min_temp': { // fahrenheit
			'c3': 15,
			'c2': 20,
			'c1': 25,
			'minimum_thresholds': true
		}
	},
	'OMDB': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 1,
			'c2': 0.5,
			'c1': 0.25
		},
		'precipitation_amount_6hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'max_temp': { // fahrenheit
			'c3': 100,
			'c2': 95,
			'c1': 90
		},
		'min_temp': { // fahrenheit
			'c3': 15,
			'c2': 20,
			'c1': 25,
			'minimum_thresholds': true
		}
	},
	'ZGGG': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'precipitation_amount_6hr': { // inches
			'c3': 3,
			'c2': 2,
			'c1': 1
		},
		'max_temp': { // fahrenheit
			'c3': 110,
			'c2': 105,
			'c1': 100
		},
		'min_temp': { // fahrenheit
			'c3': 35,
			'c2': 40,
			'c1': 45,
			'minimum_thresholds': true
		}
	},
	'ZSPD': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'precipitation_amount_6hr': { // inches
			'c3': 3,
			'c2': 2,
			'c1': 1
		},
		'max_temp': { // fahrenheit
			'c3': 105,
			'c2': 100,
			'c1': 95
		},
		'min_temp': { // fahrenheit
			'c3': 20,
			'c2': 25,
			'c1': 30,
			'minimum_thresholds': true
		}
	},
	'RJBB': {
		'ceiling': {
			'c3': 200,
			'c2': 500,
			'c1': 1000
		},
		'precipitation_amount_3hr': { // inches
			'c3': 2,
			'c2': 1,
			'c1': 0.5
		},
		'precipitation_amount_6hr': { // inches
			'c3': 3,
			'c2': 2,
			'c1': 1
		},
		'max_temp': { // fahrenheit
			'c3': 110,
			'c2': 105,
			'c1': 100
		},
		'min_temp': { // fahrenheit
			'c3': 20,
			'c2': 25,
			'c1': 30,
			'minimum_thresholds': true
		}
	},
}