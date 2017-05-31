module BenchesHelper

	def get_address(bench, latitude, longitude)
		OpenSSL::SSL.const_set(:VERIFY_PEER, OpenSSL::SSL::VERIFY_NONE)

		response = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=#{latitude},#{longitude}&key=AIzaSyAwe9H-kvFyqpFs6YbCRyEHxbkeQmaaXtg")
		bench.address = response.parsed_response["results"][0]["formatted_address"]
	end
end
