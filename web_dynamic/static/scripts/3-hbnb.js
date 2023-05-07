$(document).ready(function() {
  // Variable to store the checked amenities
  var checkedAmenities = {};

  // Listen for changes on input checkbox tags
  $('.amenity-checkbox').change(function() {
    var amenityId = $(this).data('id');
    var amenityName = $(this).data('name');

    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Store the Amenity ID in the variable
      checkedAmenities[amenityId] = amenityName;
    } else {
      // Remove the Amenity ID from the variable
      delete checkedAmenities[amenityId];
    }

    // Update the h4 tag inside the div Amenities with the list of checked Amenities
    var amenitiesList = Object.values(checkedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });


  // Request API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      // Add the class 'available' to the div#api_status
      $('#api_status').addClass('available');
    } else {
      // Remove the class 'available' from the div#api_status
      $('#api_status').removeClass('available');
    }
  });
});


 // Request places search
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done(function(data) {
    // Loop through the results and create article tags representing Places
    $.each(data, function(index, place) {
      var placeArticle = $('<article></article>');
      var placeName = $('<div class="place-name"><h2>' + place.name + '</h2></div>');
      var placePrice = $('<div class="place-price"><p>$' + place.price_by_night + '</p></div>');
      var placeDescription = $('<div class="place-description"><p>' + place.description + '</p></div>');
      var placeGuests = $('<div class="place-guests"><p>' + place.max_guest + ' Guest(s)</p></div>');
      var placeBedrooms = $('<div class="place-bedrooms"><p>' + place.number_rooms + ' Bedroom(s)</p></div>');
      var placeBathrooms = $('<div class="place-bathrooms"><p>' + place.number_bathrooms + ' Bathroom(s)</p></div>');

      placeArticle.append(placeName, placePrice, placeDescription, placeGuests, placeBedrooms, placeBathrooms);
      $('.places .place-items').append(placeArticle);
    });
  });
});
