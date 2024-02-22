/*
moon.js
Jaiden Ortiz, Erik Fredericks, c/o Ed Angel

This file does the actual drawing of the triangle
*/

// Global variables
var gl;

// Vertices for a fullscreen rectangle
var vertices = [
  -1, -1,
  1, -1,
  -1, 1,
  -1, 1,
  1, -1,
  1, 1
];

window.onload = function init() {
  // Grab the canvas object and initialize WebGL
  var canvas = document.getElementById('gl-canvas');
  gl = canvas.getContext('webgl');

  // Error checking
  if (!gl) { alert('WebGL unavailable'); }

  // Set up viewport
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Compile shaders and link program
  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  var resolutionLoc = gl.getUniformLocation(program, "iResolution");
  gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
  // Load vertex data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Associate shader variables with data buffer
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // Render
  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6); // Draw the fullscreen rectangle
}
