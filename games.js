$(document).ready(function(){
  $.ajax({
    url: 'api/games',
    type: "GET",
    data: {"key":"value"},
    success: function(data){
      for (var i = 0; i < data.length; i++) {
          $('.games').append("<li>"+data[i].game+"</li>");
      }
    }, 
    error: function(xhr, status, error){
      $('body').html("Error happened");
      var err = eval("(" + xhr.responseText + ")");
      alert(err.Message);
    }
  });
});
