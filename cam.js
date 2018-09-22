var tf = require('@tensorflow/tfjs');
var tfnode = require('@tensorflow/tfjs-node');
var WebCamera = require("webcamjs");

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
      tf.fromPixels(data_uri).print();
    });
  },

  go : function() {
    
  }
}


let mobilenet;
let model;


