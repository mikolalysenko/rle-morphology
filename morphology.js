var apply = require("rle-funcs").apply;

var DILATE_FUNC = new Function("p", "d", "retval", [
  "var s = p[0];",
  "var r = p[0] ? -d[0] : d[0];",
  "for(var i=1; i<p.length; ++i) {",
    "r = Math.min(r, p[i] ? -d[i] : d[i]);",
    "s = s | p[i];",
  "}",
  "retval[0] = s;",
  "retval[1] = Math.abs(r);"
].join("\n"));

function dilate(volume, stencil) {
  return apply(volume, stencil, DILATE_FUNC);
}

var ERODE_FUNC = new Function("p", "d", "retval", [
  "var s = p[0];",
  "var r = p[0] ? -d[0] : d[0];",
  "for(var i=1; i<p.length; ++i) {",
    "r = Math.max(r, p[i] ? -d[i] : d[i]);",
    "s = s & p[i];",
  "}",
  "retval[0] = s;",
  "retval[1] = Math.abs(r);"
].join("\n"));

function erode(volume, stencil) {
  return apply(volume, stencil, ERODE_FUNC);
}

exports.dilate  = dilate;
exports.erode   = erode
exports.closing = function(volume, stencil) { return erode(dilate(volume, stencil), stencil); }
exports.opening = function(volume, stencil) { return dilate(erode(volume, stencil), stencil); }
