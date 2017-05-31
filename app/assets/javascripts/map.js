var geojson
String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};


$(document).on("ready", function() {
		L.mapbox.accessToken = 'pk.eyJ1IjoibWFiZW5zb24wMCIsImEiOiJjaXcxM25sNGkwN3hrMnRsb2RmYmd5bm9zIn0.A-Z4kF-rbkaL50END_ZRLw';

		function setCoordinates(position) {
			var map = L.mapbox.map('map', 'mapbox.streets')
    	.setView([position.coords.latitude, position.coords.longitude], 12);
    	getEvents(map);
		}

		function setDefaultCoordinates(){
			var map = L.mapbox.map('map', 'mapbox.streets')
    	.setView([40.7128, -74.0059], 12);
    	getEvents(map);
		}
		if ("geolocation" in navigator) {
	  	navigator.geolocation.getCurrentPosition(setCoordinates, setDefaultCoordinates);
		} else {
  		setDefaultCoordinates()
		}
		
		var cssIcon = L.divIcon({
		  // Specify a class name we can refer to in CSS.
		  className: 'css-icon',
		  // Set marker width and height
		  iconSize: [60, 60]
		});
	
		function getEvents(map) {
		  var $loading_wheel = $("#spinning-wheel")
		  $loading_wheel.show();
		  $.ajax({
		    dataType: 'text',
		    url: '/benches.json',
		    success:function(benches) {
		      $loading_wheel.hide();
		      geojson = $.parseJSON(benches);
		      map.featureLayer.setGeoJSON({
		        type: "FeatureCollection",
		        features: geojson,
		        icon: cssIcon
		      });
		      addEventPopups(map);
		    },
		    error:function() {
		      $loading_wheel.hide();
		      alert("Could not load the events");
		    }
		  });
		}

		function addEventPopups(map) {
			map.eachLayer(function(layer){
				if (layer.feature) {
					let marker = layer.feature
			    layer.bindPopup('<img src="{url}">'.supplant({ url:marker.properties.url}));
			  }
			})
		};

		



});

