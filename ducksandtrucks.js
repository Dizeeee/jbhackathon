let canvas = document.getElementById("gameBoard");
context = canvas.getContext("2d");


function Model(){

	sprites = [];
	moveDir = null;
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
	if(this.moveDir != null){
		this.moveDuck();
		this.moveDir = null;
	}

		this.updateTrucks();
		/*
		for(step = 0; step < 4; step++){
			if(this.doICollide(step))
				alert("True");
		}*/
		this.doICollide(0);
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
		context.drawImage(base, x, y);
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
	console.log(step);
	if(step == 0){
		if(x+76 < tx1)
			return false;
		if(x > tx1+160)
			return false;
		if(y+72 > ty1)
			return false;
		if(y < ty1+42)
			return false;
		else
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

Controller.prototype.keyDown = function(event){

	if(event.keyCode == 39) this.key_right = true;
	else if(event.keyCode == 37) this.key_left = true;
	else if(event.keyCode == 38) this.key_up = true;
	else if(event.keyCode == 40)this.key_down = true;
}

Controller.prototype.update = function(){

	if(this.key_right){
		this.model.setMove('r');
		this.key_right = false;
	}
	if(this.key_left){
		this.model.setMove('l');
		this.key_left = false;
	}
	if(this.key_up){
		this.model.setMove('u');
		this.key_up = false;
	}
	if(this.key_down){
		this.model.setMove('d');
		this.key_down = false;
	}
}

function Game(){

	this.model = new Model();
	this.controller = new Controller(this.model);
}

Game.prototype.onTimer = function(){
	this.controller.update();
	this.model.update();
}

let game = new Game();

let timer = setInterval(function(){game.onTimer();},40);