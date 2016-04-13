var w = 960
var h = 500

var circles = [
  {x: 250, y: 250, r: 160, deg: 0},
  {x: 200, y: 200, r: 160, deg: 1}
]

var svg = d3.select("#circle")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// filter.append("feGaussianBlur")
//   .attr("in", "SourceAlpha")
//   .attr("stdDeviation", 5)
//   .attr("result", "blur");

// function addShadowFilter() {
//   console.log('dat shadow do', getX(circles[0].deg), getY(circles[0].deg))
//   var defs = svg.append("defs");
//   var filter = defs.append("filter")
//     .attr("id", "drop-shadow")
//     .attr("height", "130%");
  
//   filter.append("feOffset")
//     .attr("in", "blur")
//     .attr("dx", getX(circles[0].deg))
//     .attr("dy", getY(circles[0].deg))
//     .attr("fill", 'red')
//     .attr("result", "offsetBlur");

//   filter.append("feFlood")
//     .attr("flood-color", "black")
//     .attr("flood-opacity","0.5")
//     .attr("result", "offsetColor")

//   filter.append("feComposite")
//     .attr("in", "#offsetColor")
//     .attr("in2","offsetBlur")
//     .attr("operator", "in")
//     .attr("result", "offsetBlur")

//   var feMerge = filter.append("feMerge");
//   feMerge.append("feMergeNode").attr("in", "offsetBlur")
//   feMerge.append("feMergeNode").attr("in", "SourceGraphic")
// }

// filter.append("feColorMatrix")
//   .attr("result", 'matrixOut')
//   .attr("in", 'offset')
//   attr("type", "matrix")
//   attr("values", )
  // feColorMatrix result="matrixOut" in="offOut" type="matrix"
  //     values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />

// var item = svg.selectAll("circle")
//   .data(circles).enter()
//     .append("circle")
//     .attr("r", function(d) { return d.r; })
//     .attr("fill", "white")
//     .attr("stroke-width", 2)
//     .style("filter", "url(#drop-shadow)")
//     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"
// })

// function update() {
//   console.log('update', circles[0])
//   addShadowFilter()
//   svg.selectAll("circle")
//     .data(circles).enter()
//       .append("circle")
//       .attr("r", function(d) { return d.r; })
//       .attr("fill", "white")
//       .attr("stroke-width", 2)
//       .style("filter", "url(#drop-shadow)")
//       .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"})
// }

function render() {

  var c = svg.selectAll('circle').data(circles);
  c
    .enter()
    .append("circle")
    .attr("r", function(d) { return d.r; })
    .attr("fill", "white")
    .attr("stroke-width", 2)
    .style("filter", "url(#drop-shadow)")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"})


    svg.selectAll('filter').remove()
    var shadows = svg.selectAll("defs").data(circles)

    shadows
      .enter()
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%")
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", function(d) { return getX(d.deg) })
      .attr("dy", function(d) { return getY(d.deg) })
      .attr("result", "offsetBlur")

    shadows.append("feFlood")
      .attr("flood-color", "black")
      .attr("flood-opacity","0.8")
      .attr("result", "offsetColor")
    
    shadows.append("feComposite")
      .attr("in", "#offsetColor")
      .attr("in2","offsetBlur")
      .attr("operator", "in")
      .attr("result", "offsetBlur")

    // shadows
    //   .append("feMerge")
    //   .append("feMergeNode").attr("in", "offsetBlur")
    //   .append("feMergeNode").attr("in", "SourceGraphic")

    var feMerge = shadows.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur")
    feMerge.append("feMergeNode").attr("in", "SourceGraphic")

    shadows
      .exit()
      .remove()  
};

function getX(deg) {
  return 8 * Math.cos(deg)
}
function getY(deg) {
  return 8 * Math.sin(deg)
}

window.addEventListener('scroll', function(e) {
  var dist = document.body.scrollTop
  var min = 0
  var max = 2*Math.PI
  var rad = (dist - 4000)/(0-4000) * (max - min) + min
  circles[0].deg = rad
  circles[1].deg = 0
  console.log('SCORRLIN~', rad, 'X:', getX(rad), 'Y:', getY(rad))
  render()
})

render()
// // var s = Snap('#circle')
// var s = Snap(500,500)

// // var c1 = s.circle(250, 250, 200);
// var c2 = s.circle(200, 200, 100);
// var f1 = s.filter(Snap.filter.shadow(3, 3, 0))
// var f2 = s.filter(Snap.filter.shadow(-3, 3, 0))

// // c1.attr({
// //     fill: 'white',
// //     filter: f1
// // });

// c2.attr({
//     fill: 'white',
//     filter: f2
// });

// console.log(c2.getBBox())
// // var draw = SVG('circle')
// // var circle = draw.circle(400)

// // circle.filter(function(add) {
// //   var blur = add.offset(5, 5).in(add.sourceAlpha).gaussianBlur(1)

// //   add.blend(add.source, blur)
// // })


// // SVG.on(window, 'resize', function() { draw.spof() })
// // document.addEventListener('DOMContentLoaded', function() {
// //   $("#circle").velocity({
// //     borderRadius: "25px",
// //     width: "45px",
// //     paddingLeft: "0",
// //     paddingRight: "0",
// //     backgroundColor: "#8CC152",
// //     color: "#fff",
// //     borderColor: "#8CC152",
// //     boxShadowX: "0",
// //     boxShadowY: "0"
// //   }, {
// //       duration: 350,
// //       easing: "easeInQuad"
// //   })
// // })