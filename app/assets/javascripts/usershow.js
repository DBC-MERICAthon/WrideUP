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

})


var trip_listener = function(){
   $('ul').on('click','.trip',function(event){
   var trip_id = $(this).html();
   console.log(trip_id);

   var request = $.ajax({
      url:'http://localhost:3000/driver_data',
      type:'post',
      data: {trip_id: trip_id}
    }); //end ajax inital call

    request.done(function(response){
      // console.log(response);
        var speed_data = response.speed_profile.map(function(triplett){
          return [triplett[1],triplett[0]];
        });
        console.log(speed_data);
        graph_generator(speed_data,$('#graph'),trip_id);
      })//end each-loop
    })//end ajax done function
}

var graph_generator = function(array,container,trip_id){
  var cont = container;
  cont.highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : 'Driver Speed Data'
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









