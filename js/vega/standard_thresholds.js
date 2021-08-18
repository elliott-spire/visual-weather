function get_data_domain_range(data, y_axis_title) {
	var min = Number.MAX_VALUE;
	var max = Number.MIN_VALUE;
	for (var i=0; i < data['values'].length; i++) {
		var val = Number(data['values'][i]['Value']);
		if (val > max) {
			max = val;
		}
		if (val < min) {
			min = val;
		}
	}
	if (max == Number.MIN_VALUE) {
		max = 0;
	}
	return [min, max];
}
// https://vega.github.io/vega-lite-v3/examples/layer_bar_annotations.html
function standard_thresholds(
		minimum_thresholds, y_axis_title, data, tooltip,
		warn_threshold_val, alert_threshold_val, big_alert_threshold_val,
		color_ok, color_warn, color_alert, color_big_alert) {

	var operation = "datum.Value >= ";
	if (minimum_thresholds == true) {
		operation = "datum.Value <= ";
	}
	// customize the Y-axis scale
	var scale = {};
	if (y_axis_title.indexOf("Wind Direction") > -1) {
		scale = {
			"domain": [0, 360],
			"nice": false,
		}
	} else if (y_axis_title.indexOf("Air Pressure") > -1) {
		// tristero only
		if (urlParams.get('version') == 'fx') {
			// get the min/max range of data values to set the Y-axis
			scale = {
				"domain": [28, 32]
				// "domain": get_data_domain_range(data),
				// "range": ???
			}
		}
	}
	return {
		    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
			"title": {
				"text": y_axis_title
			},
		    "description": "",
		    "layer": [
		        {
		            "data": data,
		            "layer": [
		            // The following block creates the BLUE portion of the bar chart
		                {
		                    "mark": "bar",
		                    "encoding": {
		                        "x": {
		                        	// https://vega.github.io/vega-lite/docs/type.html
		                        	// https://vega.github.io/vega-lite/docs/timeunit.html
		                        	"timeUnit": "monthdatehours", // alt: "yearmonthdatehours"
		                        	"type": "ordinal", // alt: "temporal"
		                            "field": "Time",
		                            "axis": {
		                            	"title": "Time  (UTC)",
		                                "labelAngle": 0
		                            }
		                        },
		                        "y": {
									"field": "Value",
									"type": "quantitative",
									"scale": scale
		                        },
		                        "color": {
		                            "value": color_ok
		                        },
		                        "tooltip": tooltip
		                    }
		                },
		            // The following block creates the YELLOW portion of the bar chart
		                {
		                    "mark": "bar",
		                    "transform": [
		                        {
		                            "filter": (warn_threshold_val ? (operation + String(warn_threshold_val)) : "!datum.Value")
		                        },
		                        {
		                            "calculate": String(warn_threshold_val), // "60",
		                            "as": "baseline"
		                        }
		                    ],
		                    "encoding": {
		                        "x": {
		                        	"timeUnit": "monthdatehours", // alt: "yearmonthdatehours"
		                        	"type": "ordinal", // alt: "temporal"
		                            "field": "Time",
		                        },
		                        "y": {
		                            "field": "Value",
		                            "type": "quantitative"
		                        },
		                        "color": {
		                            "value": color_warn
		                        },
		                        "tooltip": tooltip
		                    }
		                },
		            // The following block creates the RED portion of the bar chart
		                {
		                    "mark": "bar",
		                    "transform": [
		                        {
		                            "filter": (alert_threshold_val ? (operation + String(alert_threshold_val)) : "!datum.Value")
		                        },
		                        {
		                            "calculate": String(alert_threshold_val), // "60",
		                            "as": "baseline"
		                        }
		                    ],
		                    "encoding": {
		                        "x": {
		                        	"timeUnit": "monthdatehours", // alt: "yearmonthdatehours"
		                        	"type": "ordinal", // alt: "temporal"
		                            "field": "Time",
		                        },
		                        "y": {
		                            "field": "Value",
		                            "type": "quantitative"
		                        },
		                        "color": {
		                            "value": color_alert
		                        },
		                       	"tooltip": tooltip
		                    }
		                },
		            // The following block creates the ALERTIEST portion of the bar chart
		                {
		                    "mark": "bar",
		                    "transform": [
		                        {
		                            "filter": (big_alert_threshold_val ? (operation + String(big_alert_threshold_val)) : "!datum.Value")
		                        },
		                        {
		                            "calculate": String(big_alert_threshold_val), // "60",
		                            "as": "baseline"
		                        }
		                    ],
		                    "encoding": {
		                        "x": {
		                        	"timeUnit": "monthdatehours", // alt: "yearmonthdatehours"
		                        	"type": "ordinal", // alt: "temporal"
		                            "field": "Time",
		                        },
		                        "y": {
		                            "field": "Value",
		                            "type": "quantitative"
		                        },
		                        "color": {
		                            "value": color_big_alert
		                        },
		                       	"tooltip": tooltip
		                    }
		                },
		            ]
		        },
		        {
		            "data": {
		                "values": [
		                    {
		                        "ThresholdValue": alert_threshold_val, //60,
		                        "Threshold": "",// "hazardous",
		                    },
		                    {
		                        "ThresholdValueB": warn_threshold_val, //60,
		                        "Threshold": "",// "hazardous",
		                    }
		                ]
		            },
		            "layer": [
		                {
		                    "mark": "rule",
		                    "encoding": {
		                        "y": {
		                            "field": "ThresholdValue",
		                            "type": "quantitative"
		                        },
		                        "y2": {
		                            "field": "ThresholdValueB",
		                            "type": "quantitative"
		                        },
		                        "color": {
		                            "value": "#fff"// "#e45755" // red
		                        }
		                    }
		                },
		            // this is the text label for the horizontal threshold line 
		                {
		                    "mark": {
		                        "type": "text",
		                        "align": "right",
		                        "baseline": "bottom",
		                        "dx": -2,
		                        "dy": -2
		                    },
		                    "encoding": {
		                        "x": {
		                            "value": "width"
		                        },
		                        "y": {
		                            "field": "ThresholdValue",
		                            "type": "quantitative",
		                            "axis": {
		                                "title": y_axis_title
		                            }
		                        },
		                        "text": {
		                            "field": "Threshold",
		                            "type": "ordinal"
		                        },
		                        "color": {
		                            "value": "#fff" // "#8b0000" // dark red
		                        }
		                    }
		                }
		            ]
		        }
		    ]
		}
	}