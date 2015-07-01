require 'httparty'


class DriversController < ApplicationController

  def index

  end

  def trip_data
    zen_api = Zen::DriverInfo.new
    p params
    trip_id = params[:trip_id]
    response = zen_api.speed_data("driver_or_rider_id",trip_id)
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
