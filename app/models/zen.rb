module Zen
  class DriverInfo
    include HTTParty
    HOST = "https://api.zendrive.com/v1"
    # https://api.zendrive.com/v1/driver/1/trip/1432865585823?apikey=xXDpUslPo6FZcDEsnEYKwJNsZFb6r4Ka&fields=info,speed_profile
    def speed_data(driver_id, trip_id)
      driver_id = 1
      #trip_id = 1432865585823
      apikey = "xXDpUslPo6FZcDEsnEYKwJNsZFb6r4Ka"
      path = "/driver/" + driver_id.to_s + "/trip/" + trip_id.to_s + "?apikey=#{apikey}&fields=speed_profile"
      params = {apikey:apikey ,fields: "speed_profile"}
      get(path)
    end

     # https://api.zendrive.com/v1/driver/{driver_id}/trips?apikey=xXDpUslPo6FZcDEsnEYKwJNsZFb6r4Ka
    def all_trips(driver_id)
      apikey = "xXDpUslPo6FZcDEsnEYKwJNsZFb6r4Ka"
      path = "/driver/" + driver_id.to_s + "/trips" + "?apikey=#{apikey}"
      params = {apikey:apikey ,fields: "speed_profile"}
      query = {"start_date" => "2014-07-01", "end_date" => "2015-07-01"}
      get(path , :query => query)
    end


    private
    def get (path, params={})
      url = "#{HOST}#{path}"
      #options = params
      # p '*'*90
      # p url
      # p '*'*90
      # p HTTParty.get(url)
      # p '*'*90
      HTTParty.get(url, params)
    end
  end
end
