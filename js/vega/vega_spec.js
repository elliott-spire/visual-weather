function embed_vega_spec(vega_spec, element_id) {
	// https://vega.github.io/vega/docs/config/
	var theme = {
		"background": "#000000", //"#22293d",
		"title": {"color": "#fff"},
		"style": {"guide-label": {"fill": "#fff"}, "guide-title": {"fill": "#fff"}},
		"axis": {"domainColor": "#fff", "gridColor": "#888", "tickColor": "#fff"}
	};
	// embed the Vega visualization to an HTML element
	vegaEmbed(element_id, vega_spec, {config: theme, actions: false});
	// https://vegawidget.github.io/vegawidget/reference/vega_embed.html
}

function build_vega_spec(y_axis_title, data, threshold_vals, color_scheme) {
	// define the tooltip for hover on the bar graph
	var tooltip = [
		{"field": "Value","type": "quantitative"},
		{"field": "Time","type": "ordinal", "timeUnit": "yearmonthdatehours", "title": "Time (UTC)"}
	];
	// unpack the threshold values
	var warn_threshold_val = threshold_vals['c1'];
	var alert_threshold_val = threshold_vals['c2'];
	var big_alert_threshold_val = threshold_vals['c3'];
	// initialize bar colors
	var color_ok;
	var color_warn;
	var color_alert;
	var color_big_alert;
	// TODO: support more color schemes
	if (color_scheme == "gyr") {
		color_ok = "#264f38";		// green
		color_warn = "#ffdd26";		// yellow
		color_alert = "#ce2c3b";	// red
	} else {
		color_ok = "#4c78a8";			// blue
		color_warn = "#feff03";			// yellow
		color_alert = "#ff9701";		// orange
		color_big_alert = "#ff0102";	// red
	}
	var specification;
	var bundles = urlParams.get('bundles');
	if (bundles == 'custom') {
		specification = alt_thresholds(
			threshold_vals['minimum_thresholds'], y_axis_title, data, tooltip,
			warn_threshold_val, alert_threshold_val, big_alert_threshold_val,
			color_ok, color_warn, color_alert, color_big_alert
		)
	} else {
		specification = standard_thresholds(
			threshold_vals['minimum_thresholds'], y_axis_title, data, tooltip,
			warn_threshold_val, alert_threshold_val, big_alert_threshold_val,
			color_ok, color_warn, color_alert, color_big_alert
		)
	}
	return specification;
}