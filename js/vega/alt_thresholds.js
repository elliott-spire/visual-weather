function alt_thresholds(
		minimum_thresholds, y_axis_title, data, tooltip,
		warn_threshold_val, alert_threshold_val, big_alert_threshold_val,
		color_ok, color_warn, color_alert, color_big_alert) {

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
	                {
	                    "mark": "bar",
	                    "encoding": {
	                        "x": {
	                        	// https://vega.github.io/vega-lite/docs/type.html
	                        	// https://vega.github.io/vega-lite/docs/timeunit.html
	                        	// "timeUnit": "yearmonthdatehours",
	                        	// "type": "temporal",
	                        	"timeUnit": "monthdatehours",
	                        	"type": "ordinal",
	                            "field": "Time",
	                            "axis": {
	                            	"title": "Time  (UTC)",
	                                "labelAngle": 0
	                            }
	                        },
	                        "y": {
	                            "field": "Value",
	                            "type": "quantitative"
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
	                            "filter": "datum.Value >= " + String(warn_threshold_val) //"datum.Value >= 60"
	                        },
	                        {
	                            "calculate": String(warn_threshold_val), // "60",
	                            "as": "warnbaseline"
	                        }
	                    ],
	                    "encoding": {
	                        "x": {
	                        	// "timeUnit": "yearmonthdatehours",
	                        	// "type": "temporal",
	                        	"timeUnit": "monthdatehours",
	                        	"type": "ordinal",
	                            "field": "Time",

	                        },
	                        "y": {
	                            "field": "warnbaseline",
	                            "type": "quantitative"
	                        },
	                        "y2": {
	                            "field": "Value"
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
	                            "filter": "datum.Value >= " + String(alert_threshold_val) //"datum.Value >= 60"
	                        },
	                        {
	                            "calculate": String(alert_threshold_val), // "60",
	                            "as": "baseline"
	                        }
	                    ],
	                    "encoding": {
	                        "x": {
	                        	// "timeUnit": "yearmonthdatehours",
	                        	// "type": "temporal",
	                        	"timeUnit": "monthdatehours",
	                        	"type": "ordinal",
	                            "field": "Time",
	                        },
	                        "y": {
	                            "field": "baseline",
	                            "type": "quantitative"
	                        },
	                        "y2": {
	                            "field": "Value"
	                        },
	                        "color": {
	                            "value": color_alert
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