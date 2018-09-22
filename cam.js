var tf = require('@tensorflow/tfjs');
var tfnode = require('@tensorflow/tfjs-node');
var WebCamera = require("webcamjs");
var Canvas = require('canvas');

// Loads mobilenet and returns a model that returns the internal activation
// we'll use as input to our classifier model.
async function loadMobilenet() {
  const mobilenet = await tf.loadModel(
      'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

  // Return a model that outputs an internal activation.
  const layer = mobilenet.getLayer('conv_pw_13_relu');
  return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
}

WebCamera.set({
	width: 224,
	height: 224,
	image_format: 'jpeg',
	jpeg_quality: 90
});


module.exports = {
  up: function(){
    WebCamera.snap(function(data_uri) {
      const canvas = new Canvas();
      const ctx = canvas.getContext("2d");
      const width = 224;
      const height = 224;

      const image = new Image;
      image.src = data_uri;
      image.onload = () => {
        ctx.drawImage(image, 100, 100);
        var imageData = ctx.getImageData(0, 0, 224, 224);
        console.log(imageData);
      }
      
      tf.fromPixels(imageData).print();
    });
  },

  go : function() {

  }
}


let mobilenet;
let model;


