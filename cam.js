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
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");
      const width = 224;
      const height = 224;

      const image = new Image;
      image.src = data_uri;
      image.onload = () => {
        ctx.drawImage(image, 1000, 1000);
        var imageData = ctx.getImageData(0, 0, 224, 224);
        console.log(imageData);
      }
      tf.tidy(() => {
        tf.fromPixels(canvas).print();
      })
      
    });
  },

  go : function() {
    addExample(example, label) {
      const y = tf.tidy(() => tf.oneHot(tf.tensor1d([label]), this.numClasses));
    
      if (this.xs == null) {
        this.xs = tf.keep(example);
        this.ys = tf.keep(y);
      } else {
        const oldX = this.xs;
        this.xs = tf.keep(oldX.concat(example, 0));
    
        const oldY = this.ys;
        this.ys = tf.keep(oldY.concat(y, 0));
    
        oldX.dispose();
        oldY.dispose();
        y.dispose();
      }
    }
  }
}


let mobilenet;
let model;


