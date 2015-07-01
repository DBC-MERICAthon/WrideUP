require 'httparty'


class DriverInfo < ApplicationController
  zen_api = Zen::DriverInfo.new
  def trip_data
   response = zen_api.speed_data
   p response
   render :json => response
  end
end