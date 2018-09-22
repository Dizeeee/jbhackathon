let canvas = document.getElementById("gameBoard");
context = canvas.getContext("2d");


function Model(){

	sprites = [];
	moveDir = null;
	lives = 5;
	score = 0;
	x = 10;
	y = 520;
	tx1 = 10;
	ty1 = 145;
	td1 = 1;
	tx2 = 700;
	ty2 = 230;
	td2 = -1;
	tx3 = 10;
	ty3 = 330;
	td3 = 1;
	tx4 = 700;
	ty4 = 420;
	td4 = -1;

	

	base = new Image();
	base.src = "duck_facing_up.png";
	base.onload = function(){
		context.drawImage(base, x, y);
	}

}

Model.prototype.update = function(){
	score +=1;
	if(this.moveDir != null){
		this.moveDuck();
		this.moveDir = null;
	}

		this.updateTrucks();
		
		for(step = 0; step < 4; step++){
			if(this.doICollide(step)){
				x=10;
				y=520;
				lives -=1;
				score -=50;
			}
				
		}
		//this.updateTruck(2);
		//this.updateTruck(3);
		//this.updateTruck(4);
			
		def = new Image();
		def.src = "highway_map.png";
		truck1 = new Image();
		truck1.src = "hunts.png";
		truck2 = new Image();
		truck2.src = "hunts.png";
		truck3 = new Image();
		truck3.src = "hunts.png";
		truck4 = new Image();
		truck4.src = "hunts.png";
		context.drawImage(def, 0, 0);
		if(lives > 0)
		context.drawImage(base, x, y);
		else{
			base.src="deadduck.png";
			context.drawImage(base, x, y);
		}
		context.drawImage(truck1,tx1,ty1);
		context.drawImage(truck2,tx2,ty2);
		context.drawImage(truck3,tx3,ty3);
		context.drawImage(truck4,tx4,ty4);
		

}

Model.prototype.updateTrucks = function(){

	tx1 += (10*td1);
	if(tx1 < 0 || tx1 > 700){
		td1*=-1;
	}
	tx2 += (10*td2);
	if(tx2 < 0 || tx2 > 700){
		td2*=-1;
	}
	tx3 += (10*td3);
	if(tx3 < 0 || tx3 > 700){
		td3*=-1;
	}
	tx4 += (10*td4);
	if(tx4 < 0 || tx4 > 700){
		td4*=-1;
	}
}


Model.prototype.doICollide = function(step){

	if(step == 0){

		if(x+76 < tx1)
			return false;
		if(x > tx1+160)
			return false;
		if(y+72 < ty1)
			return false;
		if(y > ty1+42)
			return false;
		return true;
	}

		if(step == 1){

		if(x+76 < tx2)
			return false;
		if(x > tx2+160)
			return false;
		if(y+72 < ty2)
			return false;
		if(y > ty2+42)
			return false;
		return true;
	}

		if(step == 2){

		if(x+76 < tx3)
			return false;
		if(x > tx3+160)
			return false;
		if(y+72 < ty3)
			return false;
		if(y > ty3+42)
			return false;
		return true;
	}
		if(step == 3){

		if(x+76 < tx4)
			return false;
		if(x > tx4+160)
			return false;
		if(y+72 < ty4)
			return false;
		if(y > ty4+42)
			return false;
		return true;
	}
}


Model.prototype.moveDuck = function(){
	if(this.moveDir == "u"){
		y-=10;
		base.src = "duck_facing_up.png";
	}
	if(this.moveDir == "d"){
		y+=10;
		base.src = "duck_facing_screen.png";
	}
	if(this.moveDir == "r"){
		x+=10;
		base.src = "duck_facing_right.png";
	}
	if(this.moveDir =="l"){
		x-=10;
		base.src = "duck_facing_left.png";
	}

	if(x < 0)
		x = 1;
	if(x+76 > 900)
		x=899-76;
	if(y < 0)
		y = 1;
	if(y+72 > 600)
		y = 600-72;
}

Model.prototype.setMove = function(direction){

	this.moveDir = direction;
}

function Controller(model){
	this.model = model;
	this.key_right = false;
	this.key_left = false;
	this.key_up = false;
	this.key_down = false;
	let self = this;

	document.addEventListener("keydown", function(event){self.keyDown(event);},false);
}

key_right = false;
key_left = false;
key_up = false;
key_down = false;

Controller.prototype.keyDown = function(event){
	/*
	if(event.keyCode == 39) this.key_right = true;
	else if(event.keyCode == 37) this.key_left = true;
	else if(event.keyCode == 38) this.key_up = true;
	else if(event.keyCode == 40)this.key_down = true;*/
}

Controller.prototype.update = function(){

	if(key_right){
		this.model.setMove('r');
		key_right = false;
	}

	if(key_left){

		this.model.setMove('l');
		key_left = false;
	}
	if(key_up){
		this.model.setMove('u');
		key_up = false;
	}
	if(key_down){
		this.model.setMove('d');
		key_down = false;
	}
}

function Game(){

	this.model = new Model();
	this.controller = new Controller(this.model);
}

Game.prototype.onTimer = function(){
	this.controller.update();
	if(lives > 0)
		this.model.update();
}

let game = new Game();

let timer = setInterval(function(){game.onTimer();},40);

(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;
 function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    
    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);

      imageData = context.getImageData(0, 0, 150,120);
      colors = imageData.data;
      found = false;
      for(var i = 0, n = colors.length; i < n; i+=4){
      			foundTol = false;
      			foundRange = false;
      			if(colors[i] >= (colors[i+1]-10) && colors[i] >= (colors[i+2]-10) &&
      			   colors[i] <= (colors[i+1]+10) && colors[i] <= (colors[i+2]+10)){
      				foundTol = true;
      				}
      			if(colors[i+2] >= colors[i]-10 && colors[i+2] >= colors[i+3]-10 &&
      			   colors[i+2] <= colors[i]+10 && colors[i+2] <= colors[i+3]+10){
      				foundTol = true;
      				}

      			if(colors[i+3] >= colors[i+2]-10 && colors[i+3] >= colors[i]-10 &&
      			   colors[i+3] <= colors[i+2]+10 && colors[i+3] <= colors[i+1]+10){
      				foundTol=true;
      			
      			}
      				
				if(colors[i] > 20 && colors[i] < 55){
					foundRange = true;
				
				}
				if(colors[i+1] > 20 && colors[i+1] < 55){
					foundRange = true;
					
				}
				if(colors[i+2] > 20 && colors[i+2] < 55){
					foundRange = true;
				
				if(foundRange)
					if(foundTol){
						found = true;
						break;					
					}
				}
      }
      if(found){
      	this.key_left = true;
      	return;
      }


      imgData = context.getImageData(150, 120, 320, 120);
      colors = imgData.data;
      found = false;
      for(var i = 0, n = colors.length; i < n; i+=4){
      			foundTol = false;
      			foundRange = false;
      			if(colors[i] >= (colors[i+1]-10) && colors[i] >= (colors[i+2]-10) &&
      			   colors[i] <= (colors[i+1]+10) && colors[i] <= (colors[i+2]+10)){
      				foundTol = true;
      				}
      			if(colors[i+2] >= colors[i]-10 && colors[i+2] >= colors[i+3]-10 &&
      			   colors[i+2] <= colors[i]+10 && colors[i+2] <= colors[i+3]+10){
      				foundTol = true;
      				}

      			if(colors[i+3] >= colors[i+2]-10 && colors[i+3] >= colors[i]-10 &&
      			   colors[i+3] <= colors[i+2]+10 && colors[i+3] <= colors[i+1]+10){
      				foundTol=true;
      			
      			}
      				
				if(colors[i] > 20 && colors[i] < 55){
					foundRange = true;
				
				}
				if(colors[i+1] > 20 && colors[i+1] < 55){
					foundRange = true;
					
				}
				if(colors[i+2] > 20 && colors[i+2] < 55){
					foundRange = true;
				
				if(foundRange)
					if(foundTol){
						found = true;
						break;					
					}
				}
      }
      if(found){
      	this.key_right = true;
      	return;
      }

      imData = context.getImageData(0, 240, 150, 240);
      colors = imData.data;
      found = false;
      for(var i = 0, n = colors.length; i < n; i+=4){
      			foundTol = false;
      			foundRange = false;
      			if(colors[i] >= (colors[i+1]-10) && colors[i] >= (colors[i+2]-10) &&
      			   colors[i] <= (colors[i+1]+10) && colors[i] <= (colors[i+2]+10)){
      				foundTol = true;
      				}
      			if(colors[i+2] >= colors[i]-10 && colors[i+2] >= colors[i+3]-10 &&
      			   colors[i+2] <= colors[i]+10 && colors[i+2] <= colors[i+3]+10){
      				foundTol = true;
      				}

      			if(colors[i+3] >= colors[i+2]-10 && colors[i+3] >= colors[i]-10 &&
      			   colors[i+3] <= colors[i+2]+10 && colors[i+3] <= colors[i+1]+10){
      				foundTol=true;
      			
      			}
      				
				if(colors[i] > 20 && colors[i] < 55){
					foundRange = true;
				
				}
				if(colors[i+1] > 20 && colors[i+1] < 55){
					foundRange = true;
					
				}
				if(colors[i+2] > 20 && colors[i+2] < 55){
					foundRange = true;
				
				if(foundRange)
					if(foundTol){
						found = true;
						break;					
					}
				}
      }
      alert(found);
      if(found){
      	this.key_up = true;
      	return;
      }


     // context.putImageData(imageData, 0, 0)
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();