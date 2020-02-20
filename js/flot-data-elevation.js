$(document).ready(function(){
	$(document).ajaxStart(function(){
    	$("#wait").css("display", "block");
    	$('body').fadeIn();
  	});
  	$(document).ajaxComplete(function(){
    	$("#wait").css("display", "none");
    	$('body').show();
  	});
	$("#btnElevation").click(function(){
		getElevation();
	});
});

function getElevation()
{
	var v1 = document.getElementById("idLat").value;
	var v2 = document.getElementById("idLong").value;
	var vElevate;
	
	// https://api.open-elevation.com/api/v1/lookup?locations=41.161758,-8.583933
	// https://elevation-api.io/dashboard
	// https://elevation-api.io/api/elevation?points=(-6.2533997,106.8477808)&key=GNPZ5QIUSfQwY8gW88dxfZNeeh8A0B
	// {"elevations":[{"lat":-6.2533997,"lon":106.8477808,"elevation":30.0}],"resolution":"5000m"}

	var url = "https://elevation-api.io/api/elevation?points=("+v1+","+v2+")&key=GNPZ5QIUSfQwY8gW88dxfZNeeh8A0B";
      $.ajax({  
        url: url,
        dataType: 'json',
        cache: false,        
        success: function(msg){           
          for(i=0;i<msg.elevations.length;i++){
          	vElevate= msg.elevations[i].elevation;          	
          	vFeet = vElevate * 3.28084;
          	//alert(vElevate);
          	document.getElementById('iKetinggian').value = vElevate;
          }
          
        }            
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Request failed. Show error message to user. 
        // errorThrown has error message.
        alert("a" +errorThrown);
  	  });	
  	 
}