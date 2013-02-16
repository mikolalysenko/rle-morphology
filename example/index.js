var $           = require("jquery-browserify")
  , numeric     = require("numeric")
  , mesh        = require("rle-mesh")
  , stencils    = require("rle-stencils")
  , morphology  = require("../../morphology.js");

var structuring_element = stencils.ball(2);

var MAX_ITER_COUNT = 3;


$(document).ready(function() {
  //Create viewer
  var viewer = require("gl-shells").makeViewer();
  
  //Import
  var bunny = require("bunny");
  var shape = require("rle-rasterize")(bunny.cells, numeric.mul(bunny.positions, 2.5));


  var state = "dilate";
  var count = 1;
  
  //Set up interval to tick state
  setInterval(function() {
  
    ++count;
    if(state === "erode") {
      shape = morphology.erode(shape, structuring_element);
      if(count > MAX_ITER_COUNT) {
        state = "dilate";
        count = 0;
      }
    } else if(state === "dilate") {
      shape = morphology.dilate(shape, structuring_element);
      
      if(count > MAX_ITER_COUNT) {
        state = "erode";
        count = 0;
      }
    }
    viewer.updateMesh(mesh(shape));
  }, 1000);
  
  //Draw initial mesh
  viewer.updateMesh(mesh(shape));
});