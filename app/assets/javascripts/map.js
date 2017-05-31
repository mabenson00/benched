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
	
		var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40.671894444444, -73.9556361111111], 12);
    	getEvents(map);


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
        features: geojson
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
});

}