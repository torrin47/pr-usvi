dojo.require("esri.map");
dojo.require("dojo.fx");// needed if use jsapi 3.0
dojo.require("agsjs.dijit.TOC");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.dijit.Measurement");
dojo.require("esri.dijit.OverviewMap");
dojo.require("esri.tasks.imageserviceidentify");
dojo.require("esri.geometry");
dojo.require("dojox.charting.Chart");
dojo.require("dojox.charting.plot2d.Lines");
dojo.require("dojox.charting.plot2d.Grid");
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.widget.SelectableLegend");
dojo.require("dojox.charting.action2d.Tooltip");
dojo.require("dojox.charting.action2d.Highlight");
dojo.require("dojox.charting.themes.PrimaryColors");
var gVar = {};

function init() {
	var initialExtent = new esri.geometry.Extent({
		"xmin" : 3034417,
		"ymin" : -81737,
		"xmax" : 3412939,
		"ymax" : 66137,
		"spatialReference" : {
            "wkid" : 102039
		}
	});

	gVar.rootURL = "http://gispub4.epa.gov/ArcGIS/rest/services/ORD_LCB/"

	gVar.backLayer = new esri.layers.ArcGISDynamicMapServiceLayer(gVar.rootURL + "PRUSVI_Backdrop_Options/MapServer");
	gVar.ancLayer = new esri.layers.ArcGISDynamicMapServiceLayer(gVar.rootURL + "PRUSVI_Ancillary_Data/MapServer");
	gVar.changeLayer = new esri.layers.ArcGISDynamicMapServiceLayer(gVar.rootURL + "PRUSVI_Change_Products/MapServer");

	gVar.map = new esri.Map("map", {
		extent : initialExtent
	});

	dojo.connect(gVar.map, 'onLoad', function(map) {
		dojo.connect(dijit.byId('map'), 'resize', resizeMap);
		esri.hide(dojo.byId("loadingWrap2"));
		//add the overview map
		var overviewMapDijit = new esri.dijit.OverviewMap({
			map : gVar.map
		});
		overviewMapDijit.startup();
		var toc = new agsjs.dijit.TOC({
			map : gVar.map,
			style : "inline",
			layerInfos : [{
				layer : gVar.backLayer,
				title : "Backdrop Options"
			}, {
				layer : gVar.changeLayer,
				title : "Change Detection Products",
				slider : true
			}, {
				layer : gVar.ancLayer,
				title : "Ancillary Data",
				slider : true
			}]
		}, 'tocDiv');
		toc.startup();
		//Initialize the charting.
		gVar.dateArray = ["1/1/2001", "1/17/2001", "2/2/2001", "2/18/2001", "3/6/2001", "3/22/2001", "4/7/2001", "4/23/2001", "5/9/2001", "5/25/2001", "6/10/2001", "6/26/2001", "7/12/2001", "7/28/2001", "8/13/2001", "8/29/2001", "9/14/2001", "9/30/2001", "10/16/2001", "11/1/2001", "11/17/2001", "12/3/2001", "12/19/2001", "1/1/2002", "1/17/2002", "2/2/2002", "2/18/2002", "3/6/2002", "3/22/2002", "4/7/2002", "4/23/2002", "5/9/2002", "5/25/2002", "6/10/2002", "6/26/2002", "7/12/2002", "7/28/2002", "8/13/2002", "8/29/2002", "9/14/2002", "9/30/2002", "10/16/2002", "11/1/2002", "11/17/2002", "12/3/2002", "12/19/2002", "1/1/2003", "1/17/2003", "2/2/2003", "2/18/2003", "3/6/2003", "3/22/2003", "4/7/2003", "4/23/2003", "5/9/2003", "5/25/2003", "6/10/2003", "6/26/2003", "7/12/2003", "7/28/2003", "8/13/2003", "8/29/2003", "9/14/2003", "9/30/2003", "10/16/2003", "11/1/2003", "11/17/2003", "12/3/2003", "12/19/2003", "1/1/2004", "1/17/2004", "2/2/2004", "2/18/2004", "3/5/2004", "3/21/2004", "4/6/2004", "4/22/2004", "5/8/2004", "5/24/2004", "6/9/2004", "6/25/2004", "7/11/2004", "7/27/2004", "8/12/2004", "8/28/2004", "9/13/2004", "9/29/2004", "10/15/2004", "10/31/2004", "11/16/2004", "12/2/2004", "12/18/2004", "1/1/2005", "1/17/2005", "2/2/2005", "2/18/2005", "3/6/2005", "3/22/2005", "4/7/2005", "4/23/2005", "5/9/2005", "5/25/2005", "6/10/2005", "6/26/2005", "7/12/2005", "7/28/2005", "8/13/2005", "8/29/2005", "9/14/2005", "9/30/2005", "10/16/2005", "11/1/2005", "11/17/2005", "12/3/2005", "12/19/2005", "1/1/2006", "1/17/2006", "2/2/2006", "2/18/2006", "3/6/2006", "3/22/2006", "4/7/2006", "4/23/2006", "5/9/2006", "5/25/2006", "6/10/2006", "6/26/2006", "7/12/2006", "7/28/2006", "8/13/2006", "8/29/2006", "9/14/2006", "9/30/2006", "10/16/2006", "11/1/2006", "11/17/2006", "12/3/2006", "12/19/2006", "1/1/2007", "1/17/2007", "2/2/2007", "2/18/2007", "3/6/2007", "3/22/2007", "4/7/2007", "4/23/2007", "5/9/2007", "5/25/2007", "6/10/2007", "6/26/2007", "7/12/2007", "7/28/2007", "8/13/2007", "8/29/2007", "9/14/2007", "9/30/2007", "10/16/2007", "11/1/2007", "11/17/2007", "12/3/2007", "12/19/2007", "1/1/2008", "1/17/2008", "2/2/2008", "2/18/2008", "3/5/2008", "3/21/2008", "4/6/2008", "4/22/2008", "5/8/2008", "5/24/2008", "6/9/2008", "6/25/2008", "7/11/2008", "7/27/2008", "8/12/2008", "8/28/2008", "9/13/2008", "9/29/2008", "10/15/2008", "10/31/2008", "11/16/2008", "12/2/2008", "12/18/2008", "1/1/2009", "1/17/2009", "2/2/2009", "2/18/2009", "3/6/2009", "3/22/2009", "4/7/2009", "4/23/2009", "5/9/2009", "5/25/2009", "6/10/2009", "6/26/2009", "7/12/2009", "7/28/2009", "8/13/2009", "8/29/2009", "9/14/2009", "9/30/2009", "10/16/2009", "11/1/2009", "11/17/2009", "12/3/2009", "12/19/2009", "1/1/2010", "1/17/2010", "2/2/2010", "2/18/2010", "3/6/2010", "3/22/2010", "4/7/2010", "4/23/2010", "5/9/2010", "5/25/2010", "6/10/2010", "6/26/2010", "7/12/2010", "7/28/2010", "8/13/2010", "8/29/2010", "9/14/2010", "9/30/2010", "10/16/2010", "11/1/2010", "11/17/2010", "12/3/2010", "12/19/2010"];
		gVar.dateLabelArray = ["1/01", "1/01", "2/01", "2/01", "3/01", "3/01", "4/01", "4/01", "5/01", "5/01", "6/01", "6/01", "7/01", "7/01", "8/01", "8/01", "9/01", "9/01", "10/01", "11/01", "11/01", "12/01", "12/01", "1/02", "1/02", "2/02", "2/02", "3/02", "3/02", "4/02", "4/02", "5/02", "5/02", "6/02", "6/02", "7/02", "7/02", "8/02", "8/02", "9/02", "9/02", "10/02", "11/02", "11/02", "12/02", "12/02", "1/03", "1/03", "2/03", "2/03", "3/03", "3/03", "4/03", "4/03", "5/03", "5/03", "6/03", "6/03", "7/03", "7/03", "8/03", "8/03", "9/03", "9/03", "10/03", "11/03", "11/03", "12/03", "12/03", "1/04", "1/04", "2/04", "2/04", "3/04", "3/04", "4/04", "4/04", "5/04", "5/04", "6/04", "6/04", "7/04", "7/04", "8/04", "8/04", "9/04", "9/04", "10/04", "10/04", "11/04", "12/04", "12/04", "1/05", "1/05", "2/05", "2/05", "3/05", "3/05", "4/05", "4/05", "5/05", "5/05", "6/05", "6/05", "7/05", "7/05", "8/05", "8/05", "9/05", "9/05", "10/05", "11/05", "11/05", "12/05", "12/05", "1/06", "1/06", "2/06", "2/06", "3/06", "3/06", "4/06", "4/06", "5/06", "5/06", "6/06", "6/06", "7/06", "7/06", "8/06", "8/06", "9/06", "9/06", "10/06", "11/06", "11/06", "12/06", "12/06", "1/07", "1/07", "2/07", "2/07", "3/07", "3/07", "4/07", "4/07", "5/07", "5/07", "6/07", "6/07", "7/07", "7/07", "8/07", "8/07", "9/07", "9/07", "10/07", "11/07", "11/07", "12/07", "12/07", "1/08", "1/08", "2/08", "2/08", "3/08", "3/08", "4/08", "4/08", "5/08", "5/08", "6/08", "6/08", "7/08", "7/08", "8/08", "8/08", "9/08", "9/08", "10/08", "10/08", "11/08", "12/08", "12/08", "1/09", "1/09", "2/09", "2/09", "3/09", "3/09", "4/09", "4/09", "5/09", "5/09", "6/09", "6/09", "7/09", "7/09", "8/09", "8/09", "9/09", "9/09", "10/09", "11/09", "11/09", "12/09", "12/09", "1/10", "1/10", "2/10", "2/10", "3/10", "3/10", "4/10", "4/10", "5/10", "5/10", "6/10", "6/10", "7/10", "7/10", "8/10", "8/10", "9/10", "9/10", "10/10", "11/10", "11/10", "12/10", "12/10"];
		gVar.xAxisArray = []
		for(i in gVar.dateLabelArray) {
			gVar.xAxisArray.push({
				value : i,
				text : gVar.dateLabelArray[i]
			});
		}
		//Initialize the identify task
		gVar.identify = {
			phenologyClean : {
				task : new esri.tasks.ImageServiceIdentifyTask(gVar.rootURL + "PRUSVI_Phenology_Clean/ImageServer"),
				name : "phenologyClean",
				color : "darkgreen",
				plot : "default"
			},
			phenologyRaw : {
				task : new esri.tasks.ImageServiceIdentifyTask(gVar.rootURL + "PRUSVI_Phenology_Raw/ImageServer"),
				name : "phenologyRaw",
				color : "lightgreen",
				plot : "default"
			},
			wetnessClean : {
				task : new esri.tasks.ImageServiceIdentifyTask(gVar.rootURL + "PRUSVI_Wetness_Index_Clean/ImageServer"),
				name : "wetnessClean",
				color : "blue",
				plot : "wetPlot"
			},
			wetnessRaw : {
				task : new esri.tasks.ImageServiceIdentifyTask(gVar.rootURL + "PRUSVI_Wetness_Index_Raw/ImageServer"),
				name : "wetnessRaw",
				color : "lightblue",
				plot : "wetPlot"
			}
		};
		gVar.idResults = {};
		gVar.identifyParams = new esri.tasks.ImageServiceIdentifyParameters();
		gVar.Graph = new dojox.charting.Chart("Graph", {
			title : "Profile For",
			titlePos : "top",
			titleGap : 5,
			titleFont : "normal normal normal 10pt Arial",
			titleFontColor : "black"
		});
		gVar.Graph.addPlot("default", {
			type : "Default",
			lines : true,
			markers : true,
			hAxis : "x",
			vAxis : "NDVI"
		});
		gVar.Graph.addPlot("wetPlot", {
			type : "Lines",
			lines : true,
			markers : true,
			hAxis : "x",
			vAxis : "wet"
		});
		gVar.Graph.addAxis("x", {
			min : 0,
			max : 229,
			majorTickStep : 23,
			title : "Date",
			titleOrientation : "away",
			titleFont : "normal normal normal 8pt Arial",
			labels : gVar.xAxisArray
		});
		gVar.Graph.addAxis("NDVI", {
			vertical : true,
			minorLabels : true,
			majorTickStep : 0.25,
			stroke : "green",
			title : "NDVI",
			titleFont : "normal normal normal 8pt Arial",
			titleFontColor : "green",
			fontColor : "green",
			min : 0,
			max : 1
		});
		gVar.Graph.addPlot("Grid", {
			type : "Grid",
			hAxis : "x",
			vAxis : "NDVI",
			hMajorLines : true,
			hMinorLines : false
		});
		gVar.Graph.addAxis("wet", {
			vertical : true,
			leftBottom : false,
			stroke : "blue",
			minorLabels : true,
			majorTickStep : 0.25,
			title : "Wetness Index",
			titleFont : "normal normal normal 8pt Arial",
			titleFontColor : "blue",
			fontColor : "blue",
			min : 0,
			max : 1
		});
		gVar.Graph.setTheme(dojox.charting.themes.PrimaryColors);
		var action1 = new dojox.charting.action2d.Highlight(gVar.Graph, "default");
		var action2 = new dojox.charting.action2d.Tooltip(gVar.Graph, "default");
		gVar.Graph.render();

        // Code to customize the visibility of layers in the TOC
        var toggleList = ['1'];
        dojo.forEach(toggleList,function(nodeID){
            var int = window.setInterval(function(){
                test = dojo.byId("agsjs_dijit__TOCNode_" + nodeID);
                if (test) {
                    dijit.byId("agsjs_dijit__TOCNode_" + nodeID)._toggleContainer();
                    window.clearInterval(int)
                }
            },100);
        });
        //add the navigation toolbar
        gVar.navToolbar = new esri.toolbars.Navigation(gVar.map);
        dojo.connect(gVar.navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);
        //add the scale bar
        var scalebar = new esri.dijit.Scalebar({
            map : gVar.map,
            attachTo : "bottom-left",
            scalebarUnit : 'english'
        });
        //add the measurement toolbar
        esri.config.defaults.geometryService = new esri.tasks.GeometryService("http://gispub4.epa.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer");
        //esri.config.defaults.geometryService = new esri.tasks.GeometryService("http://sampleserver3.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer");
        gVar.measurement = new esri.dijit.Measurement({
            map : gVar.map
        }, dojo.byId('measurementDiv'));
        gVar.measurement.startup();
        dojo.byId('measureWindow').style.display = 'none';
	});
	//Add the map layers
	gVar.map.addLayer(gVar.backLayer);
	gVar.map.addLayer(gVar.ancLayer);
	gVar.map.addLayer(gVar.changeLayer);
}

function resizeMap() {
	//resize the map when the browser resizes - view the 'Resizing and repositioning the map' section in
	//the following help topic for more details http://help.esri.com/EN/webapi/javascript/arcgis/help/jshelp_start.htm#jshelp/inside_guidelines.htm
	var resizeTimer;
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		gVar.map.resize();
		gVar.map.reposition();
	}, 500);
}

function extentHistoryChangeHandler() {
	dijit.byId("zoomprev").disabled = gVar.navToolbar.isFirstExtent();
	dijit.byId("zoomnext").disabled = gVar.navToolbar.isLastExtent();
}

function toggleMeasurement() {
	if(dojo.byId('measureWindow').style.display == 'none') {
		dojo.byId('measureWindow').style.display = '';
	} else {
		dojo.byId('measureWindow').style.display = 'none';
		gVar.measurement.clearResult();
	}
}

function toggleChart(chartButton) {
	if(chartButton.checked) {
		gVar.doID = dojo.connect(gVar.map, "onClick", doID);
	} else {
		dojo.disconnect(gVar.doID);
	}

}

function zoomTo(zoomX, zoomY) {
	zoomY = dojo.byId('zoomLat').value;
	zoomX = dojo.byId('zoomLong').value;
	var location = new esri.geometry.Point(zoomX, zoomY, new esri.SpatialReference({
		wkid : 4236
	}));
	esri.config.defaults.geometryService.project([location], new esri.SpatialReference({
		wkid : 102039
	}), function(projectedPoints) {
		pt = projectedPoints[0];
		gVar.map.centerAndZoom(pt, 0.5);
	});
}

function doID(evt) {
	gVar.map.graphics.clear();
	esri.show(dojo.byId("loadingWrap2"));
	//We're making the assumption that the difference in datum between the Albers_Conical_Equal_Area projection
	//in NAD83 ("wkid" : "102039") and WGS84 (no wkid) is negligible at this resolution.
	gVar.idSpatialReference = new esri.SpatialReference({
		wkid : 102039
	});
	gVar.identifyParams.geometry = new esri.geometry.Point(evt.mapPoint.x, evt.mapPoint.y, gVar.idSpatialReference);
	gVar.idCount = 0;
	gVar.idTotal = 0;
	for(var idTask in gVar.identify) {
		if(dijit.byId(idTask + "Check").checked) {
			idSwitch(gVar.identify[idTask]);
			gVar.idTotal += 1;
		} else {
			gVar.Graph.removeSeries(idTask.name);
		}
	}
	if(gVar.idTotal > 0) {
		var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_X, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([255, 0, 0, 0]));
		gVar.map.graphics.add(new esri.Graphic(evt.mapPoint, symbol));
		//Get the Coordinates and put them in the right places on the page
		esri.config.defaults.geometryService.project([evt.mapPoint], new esri.SpatialReference({
			wkid : 4236
		}), function(projectedPoints) {
			pt = projectedPoints[0];
			gVar.Graph.title = "Profile For Longitude: " + String(Math.round(pt.x * 10000) / 10000) + ", Latitude: " + String(Math.round(pt.y * 10000) / 10000);
			dojo.byId('zoomLat').value = pt.y;
			dojo.byId('zoomLong').value = pt.x;
		});
	} else {
		//hide the loading animation
		esri.hide(dojo.byId("loadingWrap2"));
	}
}

function idSwitch(identify) {
	switch (identify.name) {
		case 'phenologyClean':
			identify.task.execute(gVar.identifyParams, function(idResults) {
				graphResults(idResults, 'phenologyClean');
			});
			break;
		case 'phenologyRaw':
			identify.task.execute(gVar.identifyParams, function(idResults) {
				graphResults(idResults, 'phenologyRaw');
			});
			break;
		case 'wetnessRaw':
			identify.task.execute(gVar.identifyParams, function(idResults) {
				graphResults(idResults, 'wetnessRaw');
			});
			break;
		case 'wetnessClean':
			identify.task.execute(gVar.identifyParams, function(idResults) {
				graphResults(idResults, 'wetnessClean');
			});
			break;
	}
}

function graphResults(idResults, idKey) {
	var idTask = gVar.identify[idKey];
	var convertedResults = convertResults(idResults);
	//Add the series to the graph using pre-defined parameters
	gVar.Graph.addSeries(idTask.name, convertedResults, {
		plot : idTask.plot,
		stroke : {
			color : idTask.color,
			width : 2
		},
		marker : "m-1,-1 l0,1 1,0 0,-1 z"
	});
	//Store the results for later use in case the user toggles the graph
	gVar.idResults[idTask.name] = convertedResults;
	//increment the results counter
	gVar.idCount += 1;
	//if we've received all active results...
	if(gVar.idCount >= gVar.idTotal) {
		//Render the graph
		gVar.Graph.render();
		//show the graph pane
		if(!(dijit.byId('graphPane')._showing)) {
			dijit.byId("graphPane").toggle();
		}
		//hide the loading animation
		esri.hide(dojo.byId("loadingWrap2"));
		//fetch the id results for the other, unchecked options
		for(var idTask in gVar.identify) {
			if(!dijit.byId(idTask + "Check").checked) {
				parkSwitch(gVar.identify[idTask]);
			}
		}
	}
}

function parkSwitch(identify) {
	switch (identify.name) {
		case 'phenologyClean':
			identify.task.execute(gVar.identifyParams, function(idResults) {
				parkResults(idResults, 'phenologyClean');
			});
			break;
		case 'phenologyRaw':
			identify.task.execute(gVar.identifyParams, function(idResults) {
				parkResults(idResults, 'phenologyRaw');
			});
			break;
		case 'wetnessRaw':
			identify.task.execute(gVar.identifyParams, function(idResults) {
				parkResults(idResults, 'wetnessRaw');
			});
			break;
		case 'wetnessClean':
			identify.task.execute(gVar.identifyParams, function(idResults) {
				parkResults(idResults, 'wetnessClean');
			});
			break;
	}
}

function parkResults(idResults, idTask) {
	//Store the results for later use in case the user toggles the graph
	var convertedResults = convertResults(idResults);
	gVar.idResults[idTask] = convertedResults;
}

function isEmpty(ob) {
	for(var i in ob) {
		return false;
	}
	return true;
}

function toggleCB(cbID) {
	//if the chart button is turned on and we've already gotten results, react, otherwise do nothing
	if(dijit.byId('chartButton').checked && !(isEmpty(gVar.idResults))) {
		var idTask = gVar.identify[cbID];
		//if the checkbox is checked
		if(dijit.byId(cbID + "Check").checked) {
			//Add the series to the graph using pre-defined parameters
			gVar.Graph.addSeries(idTask.name, gVar.idResults[idTask.name], {
				plot : idTask.plot,
				stroke : {
					color : idTask.color,
					width : 2
				},
				marker : "m-1,-1 l0,1 1,0 0,-1 z"
			});
		} else {
			gVar.Graph.removeSeries(idTask.name);
		}
		//Render the graph
		gVar.Graph.render();
	}
}

function convertResults(results) {
	//Convert a string of values to an array of integers
	var stringArray = results.value.split(",");
	var intArray = [];
	var y;
	for(i in stringArray) {
		y = parseInt(stringArray[i]) / 10000
		intArray.push({
			x : i,
			y : y,
			tooltip : gVar.dateArray[i] + " - " + y
		});
	}
	return intArray
}

//show map on load
dojo.addOnLoad(init);
