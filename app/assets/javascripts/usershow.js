$(document).on('page:change', function(){
 if ($(".trips_list").length)
  {
    var request = $.ajax({
      url:'http://localhost:3000/driver_data/trip_all',
      type:'get',
    }); //end ajax inital call

    request.done(function(response){
      var trip_container = $(".trips_list");
      response.trips.forEach(function(trip){
        var trip_id = trip.trip_id;
        trip_container.append('<li>'+'<button class="trip">'+trip_id+'</button>'+'</li>');
      })//end each-loop
    })//end ajax done function

  }//end if statement

 trip_listener();

})//document ready end


var trip_listener = function(){
   $('ul').on('click','.trip',function(event){
   var tripId = $(this).html();

   var request = $.ajax({
      url:'http://localhost:3000/driver_data',
      type:'post',
      data: {trip_id: tripId}
    }); //end ajax inital call

    request.done(function(response){
      // console.log(response);
        var speed_data = response.speed_profile.map(function(triplett){
          return [triplett[1],triplett[0]];
        });

        //console.log(speed_data);
        graph_generator(speed_data,$('#graph'),tripId);

    });//request done

    var request2 = $.ajax({
          url: 'http://localhost:3000/driver_data/trip_location',
          type: 'get',
          data: {trip_id: tripId}
    });

    var flightPlanCoordinates = [];

    request2.done(function(response){
          response.simple_path.forEach(function(coordObject,i){
              //console.log(i, new google.maps.LatLng(coordObject.latitude,coordObject.longitude));
             flightPlanCoordinates.push( new google.maps.LatLng(coordObject.latitude, coordObject.longitude) );
          });
          console.log("this is my trip id " + tripId);
          googleMapMaker(tripId,flightPlanCoordinates);
    });//end request2 done function

  })//end on click function for trip id button
}

var graph_generator = function(array,container,trip_id){
  var cont = container;
  cont.highcharts('StockChart', {


            rangeSelector : {
                allButtonsEnabled: true,
                selected : 2
            },

            title : {
                text : 'Driver Speed Data'
            },

            yAxis: {
              title: {
                text:'Speed (km/s)'
              }
            },

            series : [{
                name : 'Trip #'+trip_id,
                data : array,
                tooltip: {
                    valueDecimals: 2
                }
            }]
  });

}


  // This example creates a 2-pixel-wide red polyline showing
  // the path of William Kingsford Smith's first trans-Pacific flight between
  // Oakland, CA, and Brisbane, Australia.
  var googleMapMaker = function(trip_id,coords){
      var coords = coords;
      var last = coords.length - 1;
      var cx = (coords[last].A - coords[0].A) / 2 + coords[0].A;
      var cy = (coords[last].F - coords[0].F) / 2 + coords[0].F;

      console.log(cx,cy);
      function initialize(coords,centerX,centerY) {
        var mapOptions = {
          zoom: 12,
          center: { lat: centerX, lng: centerY },
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);


        // var flightPlanCoordinates = [
        //   new google.maps.LatLng(37.772323, -122.214897),
        //   new google.maps.LatLng(21.291982, -157.821856),
        //   new google.maps.LatLng(-18.142599, 178.431),
        //   new google.maps.LatLng(-27.46758, 153.027892)
        // ];
        var flightPath = new google.maps.Polyline({
          path: coords,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

       flightPath.setMap(map);
    }

   initialize(coords,cx,cy);

}







