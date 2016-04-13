var two = new Two({
  autostart: true,
  width: window.innerWidth,
  height: window.innerHeight
}).appendTo(document.getElementById('circle'));

Two.Resoultion = 32;

var delta = new Two.Vector();
var mouse = new Two.Vector();
var radius = 250;
var centerX = two.width / 2
var centerY = two.height / 2
console.log(centerX, centerY)

//Outer cirlce & shadow
var outerShadow = two.makeCircle(centerX, centerY, radius);
outerShadow.noStroke()
outerShadow.fill = 'rgb(190,190,190)'

var circle = two.makeCircle(centerX, centerY, radius);
circle.noStroke()
circle.fill = 'white'

var innerShadow = two.makeCircle(centerX, centerY, radius - 25);
innerShadow.noStroke()
innerShadow.fill = 'rgb(190,190,190)'

var circle = two.makeCircle(centerX, centerY, radius - 25);
circle.noStroke()
circle.fill = 'white'
// ball.noStroke().fill = 'blue';
// shadow.noStroke().fill = 'rgba(5, 5, 5, 0.2)';
// shadow.offset = new Two.Vector(10, 20);
// shadow.scale = 0.85;

two.bind('update', function() {
  // console.log(document.body.scrollTop)
  var new_coords = scrollToCoords()
  outerShadow.translation.set(centerX + new_coords.x, centerY + new_coords.y)
  innerShadow.translation.set(centerX + new_coords.y, centerY + new_coords.x)
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

console.log(shadow.translation.x)
// var new_coords = scrollToCoords()
// console.log(new_coords)