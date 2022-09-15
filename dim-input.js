define( [
	'angular',
	"qlik",
	"jquery",
	"text!./dim-input.css",
	"text!./dim-input.html",
	"./definitions",
	"./properties"
],
function (angular ,qlik, $, cssContent, inputHTML, def, prop)
{
	'use strict';
	var $injector = angular.injector( ['ng'] );
	var $http = $injector.get( "$http" );
	
	$("<style>").html(cssContent).appendTo("head");
	
	return {
       template: inputHTML,
       initialProperties : prop,
		definition : def,
		support : {
			snapshot: true,
			export: true,
			exportData : true
		},
		paint: function ($element, layout) {
			var self=this
			  , hypercube = layout.qHyperCube
			  , dimInfo=hypercube.qDimensionInfo
			  , fieldName = dimInfo[0].qFallbackTitle
			  , app = qlik.currApp();
		
			var selState = app.selectionState();
			
			var isDelete=true;
			selState.selections.forEach(function(selection) {
				if(selection.fieldName==fieldName) {
					isDelete=false;
				}
			});
			
			if (isDelete && $("#searchText").val() != "") {
				$("#searchText").val("");
			}

			$("#searchText").on("keypress", function(event) {
				if (event.key=="Enter") {
					var matchString="*"+$("#searchText").val().replace(" ","*")+"*";
					dimInfo.forEach(function(dim) {
						app.field(dim.qFallbackTitle).selectMatch(matchString);
					})
				}
			})
			
			$("#searchDelete").on("click", function(event) {
				$("#searchText").val("");
					dimInfo.forEach(function(dim) {
						app.field(dim.qFallbackTitle).clear();
					})
			})
			
			return qlik.Promise.resolve();
		}
	};
} );