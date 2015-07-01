require 'httparty'


class DriversController < ApplicationController

  def trip_data
    zen_api = Zen::DriverInfo.new
    response = zen_api.speed_data("test","test")
    p response
    render :json => response
  end

  def trip_all
    zen_api = Zen::DriverInfo.new
    response = zen_api.all_trips(1)
    p response
    render :json => response
  end

  def show
  end
end
