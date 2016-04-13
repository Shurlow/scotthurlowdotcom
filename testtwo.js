var two = new Two({
  autostart: true,
  width: window.innerWidth,
  height: window.innerHeight
}).appendTo(document.getElementById('circle'));

Two.Resoultion = 32;

var delta = new Two.Vector();
var mouse = new Two.Vector();
var radius = 300;
var centerX = two.width / 2
var centerY = two.height / 2
var offwhite = 'rgb(235, 235, 235)'
var fillcolor = 'rgba(200, 200, 200, 0.5)'
// var fillcolor = 'white'
console.log(centerX, centerY)

//Outer cirlce & shadow
var outerShadow = two.makeCircle(centerX, centerY, radius);
outerShadow.noStroke()
outerShadow.fill = fillcolor

console.log(outerShadow)

var circle = two.makeCircle(centerX, centerY, radius);
circle.noStroke()
circle.fill = offwhite

var innerShadow = two.makeCircle(centerX, centerY, radius - 50);
innerShadow.noStroke()
innerShadow.fill = fillcolor

var circle = two.makeCircle(centerX, centerY, radius - 50);
circle.noStroke()
circle.fill = offwhite
// ball.noStroke().fill = 'blue';
// shadow.noStroke().fill = 'rgba(5, 5, 5, 0.2)';
// shadow.offset = new Two.Vector(10, 20);
// shadow.scale = 0.85;

two.bind('update', function() {
  // console.log(document.body.scrollTop)
  var new_coords = scrollToCoords()
  outerShadow.translation.set(centerX + new_coords.x, centerY + new_coords.y)
  innerShadow.translation.set(centerX - new_coords.y, centerY - new_coords.x)
});

function scrollToCoords() {
  var dist = document.body.scrollTop
  var min = 0
  var max = 2*Math.PI
  var rad = (dist - 4000)/(1-4000) * (max - min) + min
  var x = 15 * Math.cos(rad)
  var y = 15 * Math.sin(rad)
  return {
    'x': x,
    'y': y
  }
}

// console.log(shadow.translation.x)
// var new_coords = scrollToCoords()
// console.log(new_coords)