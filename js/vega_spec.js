function embed_vega_spec(vega_spec, element_id) {
	// https://vega.github.io/vega/docs/config/
	var theme = {
		"background": "#22293d",
		"title": {"color": "#fff"},
		"style": {"guide-label": {"fill": "#fff"}, "guide-title": {"fill": "#fff"}},
		"axis": {"domainColor": "#fff", "gridColor": "#888", "tickColor": "#fff"}
	}
	// embed the Vega visualization to an HTML element
	vegaEmbed(element_id, vega_spec, {config: theme});
}

function build_vega_spec(y_axis_title, data, warn_threshold_val, alert_threshold_val) {
	var tooltip = [
		{"field": "Value","type": "quantitative"},
		{"field": "Time","type": "ordinal"}
	]
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
	                        	"type": "ordinal",
	                            "field": "Time",
	                            "axis": {
	                            	"title": "Time",
	                                "labelAngle": 0
	                            }
	                        },
	                        "y": {
	                            "field": "Value",
	                            "type": "quantitative"
	                        },
	                        "color": {
	                            "value": "#264f38" // green
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
	                            "value": "#ffdd26" // yellow
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
	                            "value": "#ce2c3b" // red
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
// end function
}