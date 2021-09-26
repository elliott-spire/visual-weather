var c3 = 'red'; 	// "Warning"
var c2 = 'orange';	// "Alert"
var c1 = 'yellow';	// "Min"
/////////////////////
var fx_airports = [
	"KMEM",
	"KIND",
	"KEWR",
	"KGSO",
	"PANC",
	"KAFW",
	"LFPG",
	"EDDK",
	"OMDB",
	"ZGGG",
	"ZSPD",
	"RJBB",
	"RJAA",
	"RCTP",
	"CYYC",
	"CYYZ",
	"CYMX",
	"KSDF",
	"KPIT",
	"KCLT",
	"KATL",
	"KDEN",
	"KMSP",
	"KMIA",
	"KPHL",
	"KORD",
	"KLAX",
	"KBOS"
];
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
var fx_rel_hum_thresholds = {
	'c3': 94, // %     // red >94%
	'c2': 90,          // orange for 90-94%
	'c1': 85,          // yellow for 85-89%
}
var fx_snow_thresholds = {
	'c3': 1, // inch   // Heavy Snow: > 1"/hr
	'c2': (1/3),         // Moderate Snow: >1/3"/hr up to 1"/hr
	'c1': (1/10),        // Light Snow: >1/10" up to 1/3"
}
var fx_cloud_ceiling_thresholds = {
	// 0-100 ft – Red
	// 100-200 ft – Red
	// 200-500 ft – Orange
	// 500-1000 ft – Yellow
	// 1000-3100 ft – None
	// 3100-5500 ft – None
	// "no ceiling" – None
    "0-30 m": "red-ceiling",
    "30-60 m": "red-ceiling",
    "60-152 m": "orange-ceiling",
    "152-304 m": "yellow-ceiling",
    "304-944 m": "",
    "944-1676 m": "",
    "none": "",
}
// distinct thresholds
var fx_thresholds = {
	'KOAK': {},
	'KMEM': {
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
	'RJAA': {
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
	'RCTP': {
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
			'c3': 40,
			'c2': 45,
			'c1': 50,
			'minimum_thresholds': true
		}
	},
	'CYYC': {
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
			'c3': 100,
			'c2': 95,
			'c1': 90
		},
		'min_temp': { // fahrenheit
			'c3': -10,
			'c2': -5,
			'c1': 0,
			'minimum_thresholds': true
		}
	},
	'CYYZ': {
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
			'c3': 100,
			'c2': 95,
			'c1': 90
		},
		'min_temp': { // fahrenheit
			'c3': -10,
			'c2': -5,
			'c1': 0,
			'minimum_thresholds': true
		}
	},
	'CYMX': {
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
			'c3': 100,
			'c2': 95,
			'c1': 90
		},
		'min_temp': { // fahrenheit
			'c3': -10,
			'c2': -5,
			'c1': 0,
			'minimum_thresholds': true
		}
	},
	'KDEN': {
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
			'c3': 100,
			'c2': 95,
			'c1': 90
		},
		'min_temp': { // fahrenheit
			'c3': -10,
			'c2': -5,
			'c1': 0,
			'minimum_thresholds': true
		}
	},
	'KSDF': {
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
	'KCLT': {
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
	'KATL': {
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
	'KPIT': {
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
	'KPHL': {
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
	'KBOS': {
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
	'KMSP': {
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
			'c3': 100,
			'c2': 95,
			'c1': 90
		},
		'min_temp': { // fahrenheit
			'c3': -20,
			'c2': -15,
			'c1': -10,
			'minimum_thresholds': true
		}
	},
	'KORD': {
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
			'c3': 100,
			'c2': 95,
			'c1': 90
		},
		'min_temp': { // fahrenheit
			'c3': -10,
			'c2': -5,
			'c1': 0,
			'minimum_thresholds': true
		}
	},
	'KMIA': {
		'precipitation_amount_3hr': { // inches
			'c3': 1.5,
			'c2': 1.25,
			'c1': 0.75
		},
		'precipitation_amount_6hr': { // inches
			'c3': 2.0,
			'c2': 1.5,
			'c1': 1.25
		},
		'max_temp': { // fahrenheit
			'c3': 95,
			'c2': 90,
			'c1': 85
		},
		'min_temp': { // fahrenheit
			'c3': 40,
			'c2': 45,
			'c1': 50,
			'minimum_thresholds': true
		}
	},
	'KLAX': {
		'precipitation_amount_3hr': { // inches
			'c3': 1.0,
			'c2': 0.5,
			'c1': 0.25
		},
		'precipitation_amount_6hr': { // inches
			'c3': 2.0,
			'c2': 1.0,
			'c1': 0.5
		},
		'max_temp': { // fahrenheit
			'c3': 95,
			'c2': 90,
			'c1': 85
		},
		'min_temp': { // fahrenheit
			'c3': 35,
			'c2': 40,
			'c1': 45,
			'minimum_thresholds': true
		}
	},
}