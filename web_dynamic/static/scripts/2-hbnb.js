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
