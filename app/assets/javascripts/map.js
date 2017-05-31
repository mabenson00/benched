var geojson
var markers
var myLayer
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
		var map;	
		function setCoordinates(position) {
			map = L.mapbox.map('map', 'mapbox.streets')
    	.setView([position.coords.latitude, position.coords.longitude], 12);
    	getEvents(map);
    	zoom(map);
    	move(map);
		}

		function setDefaultCoordinates(){
			map = L.mapbox.map('map', 'mapbox.streets')
    	.setView([40.7128, -74.0059], 12);
    	getEvents(map);
    	zoom(map);
    	move(map);
		}
		if ("geolocation" in navigator) {
	  	navigator.geolocation.getCurrentPosition(setCoordinates, setDefaultCoordinates);
		} else {
  		setDefaultCoordinates()
		}// gets geo coordinates
		
	

		var myIcon = L.icon({
		    iconUrl: '/bench2.png',
		    iconSize: [40, 19],
		    popupAnchor: [-3, -10]
		});//sets icon


		function getEvents(map) {
		  var $loading_wheel = $("#spinning-wheel")
		  $loading_wheel.show();
		  $.ajax({
		    dataType: 'text',
		    url: '/benches.json',
		    success:function(benches) {
		      $loading_wheel.hide();
		      geojson = $.parseJSON(benches);
		      myLayer = L.mapbox.featureLayer().addTo(map);
		     	markers = L.geoJSON(geojson, {
    				pointToLayer: function (feature, latlng) {	
        		return L.marker(latlng, {rotationAngle:  (feature.geometry.angle -180), icon: myIcon} );
    			}
				}).addTo(myLayer);
		     addEventPopups(map);
		    },
		    error:function() {
		      $loading_wheel.hide();
		      alert("Could not load the events");
		    }
		  });
		}//loads data

		function addEventPopups(map) {
			map.eachLayer(function(layer){
				if (layer.feature) {
					let marker = layer.feature
			    layer.bindPopup('<img src="{url}">'.supplant({ url:marker.properties.url}));
			  }
			})
		};

		//begin change icon on zoom
		function zoom(map) {
			map.on('zoomend', function() {
			  var currentZoom = map.getZoom();
			  var zoomDifference = currentZoom-12
			  var newWidth = 40 + zoomDifference*5
			  var newHeight = 19 + zoomDifference*2.5
			  $( ".leaflet-marker-icon" ).css( {"width": newWidth, "height": newHeight } )
			});
		}
		//end change icon on zoom

		//begin get inbounds benches on move
		function move(map) {
			map.on('move', function() {
			    // Construct an empty list to fill with onscreen markers.
			    var inBounds = [],
			    // Get the map bounds - the top-left and bottom-right locations.
			    bounds = map.getBounds();
			    console.log(inBounds)

			    // For each marker, consider whether it is currently visible by comparing
			    // with the current map bounds.
			    myLayer.eachLayer(function(marker) {
			    	console.log(marker)
			        if (bounds.contains(marker.getLatLng())) {
			            inBounds.push(marker.options.address);
			            inBounds.push(marker.options.address);
			        }
			    });

			    // Display a list of markers.
			    document.getElementById('coordinates').innerHTML = inBounds.join('\n');
			});

		}
		
});

