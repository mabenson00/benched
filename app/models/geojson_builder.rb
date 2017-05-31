class GeojsonBuilder
  def self.build_event(bench)
    geojson = []
     geojson << {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [bench.longitude, bench.latitude]
      },
      properties: {
        rating: bench.rating,
        url: bench.picture.url(:thumb),
        :"marker-color" => "#FFFFFF",
        :"marker-symbol" => "prison",
        :"marker-size" => "medium",
      }
    }
    return geojson
  end
end