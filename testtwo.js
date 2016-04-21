var two = new Two({
  autostart: true,
  width: window.innerWidth,
  height: window.innerHeight
}).appendTo(document.getElementById('circle'));

Two.Resoultion = 32;

var delta = new Two.Vector();
var mouse = new Two.Vector();
var radius = 400;
var centerX = two.width / 2
var centerY = two.height / 2
var offwhite = 'rgb(240, 240, 240)'
var offwhite2 = 'rgb(235, 235, 235)'
// var offwhite = 'white'
var fillcolor = 'rgba(100, 100, 100, 0.4)'
// var fillcolor = 'white'
console.log(centerX, centerY)

//Outer cirlce & shadow
var outerShadow = two.makeCircle(centerX, centerY, radius + 3);
outerShadow.noStroke()
outerShadow.fill = fillcolor

var circle = two.makeCircle(centerX, centerY, radius);
circle.noStroke()
circle.fill = offwhite

var innerShadow = two.makeCircle(centerX, centerY, radius - 47);
innerShadow.noStroke()
innerShadow.fill = fillcolor

var circle2 = two.makeCircle(centerX, centerY, radius - 50);
circle2.noStroke()
circle2.fill = offwhite2
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
  var x = 3 * Math.cos(rad)
  var y = 3 * Math.sin(rad)
  return {
    'x': x,
    'y': y
  }
}

// console.log(shadow.translation.x)
// var new_coords = scrollToCoords()
// console.log(new_coords)