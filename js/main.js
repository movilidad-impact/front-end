function map() {
  let estado = document.getElementById("estado").value;

    const url='http://maps.google.com/maps/api/geocode/json?components=country:MX&postalCode:'+estado+'&address='+estado;
    console.log(url);
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.response;
        response = JSON.parse(response);

        console.log(response)
        console.log(
           `Ciudad:${response.results[0].formatted_address}\n`,
           `Latitud: ${response.results[0].geometry.location.lat}\n`,
           `Longitud: ${response.results[0].geometry.location.lng}\n`);
        initMap(response.results[0].geometry.location.lat,response.results[0].geometry.location.lng)
        }

      }

    xhttp.open('GET', url, true);
    xhttp.send();
  }

  function initMap(lati,lon) {
       var uluru = {lat:lati, lng: lon};
       var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 15,
         center: uluru
       });
       var marker = new google.maps.Marker({
         position: uluru,
         map: map
       });
       var flightPlanCoordinates = [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
     }
