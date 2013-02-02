var $           = require("jquery-browserify")
  , core        = require("rle-core")
  , mesh        = require("rle-mesh")
  , stencils    = require("rle-stencils")
  , morphology  = require("../../morphology.js");

var structuring_element = stencils.ball(2);

$(document).ready(function() {
  //Create viewer
  var viewer = require("gl-shells").makeViewer();
  
  //Create an initial shape
  var shape = core.sample([-5, -5, -5], [5,5,5], function(x) {
    if(x[0] === 0 && x[1] === 0 && x[2] === 0) {
      return 1;
    }
    return 0;
  })
  
  //Set up interval to tick state
  setInterval(function() {
    shape = morphology.dilate(shape, structuring_element);
    viewer.updateMesh(mesh(shape));
  }, 500);
  
  //Draw initial mesh
  viewer.updateMesh(mesh(shape));
});