module Zen
  class DriverInfo
    include HTTParty
    HOST = "https://api.zendrive.com/v1"
    # https://api.zendrive.com/v1/driver/1/trip/1432865585823?apikey=xXDpUslPo6FZcDEsnEYKwJNsZFb6r4Ka&fields=info,speed_profile
    def speed_data(driver_id, trip_id)
      driver_id = 1
      trip_id = 1432865585823
      path = "/driver/" + driver_id + "/trip/" + trip_id
      params = {apikey:"xXDpUslPo6FZcDEsnEYKwJNsZFb6r4Ka" ,fields: "speed_profile"}
      get(path, params)
    end


    private
    def get (path, params={})
      url = "#{HOST}#{path}"

      options = params

      HTTParty.get(url, options)
    end
  end
end