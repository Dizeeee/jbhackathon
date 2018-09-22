
let canvas = document.getElementById("gameBoard");
let context = canvas.getContext("2d");
base = new Image();
base.src = "duck.png";
base.onLoad = function(){
	context.drawImage(base, 0, 0);}

function Model(){

	let sprites = [];
	this.moveDir = null;


	/*base = new Image();
	base.src = "img/duck.png";
	base.onLoad = function(){
		context.drawImage(base, 0, 0);
	}*/

}

Model.prototype.update = function(){


}

Model.prototype.move = function(direction){

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
		this.model.move('r');
		this.key_right = false;
	}
	if(this.key_left){
		this.model.move('l');
		this.key_left = false;
	}
	if(this.key_up){
		this.model.move('u');
		this.key_up = false;
	}
	if(this.key_down){
		this.model.move('d');
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

