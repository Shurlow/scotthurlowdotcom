var width = window.innerWidth;
var height = window.innerHeight;

function main() {

	document.querySelector('body').onclick = function(e) {
		e.preventDefault()
		// window.location.pathname = 'resume.html'
		// window.open('ScottHurlow_Resume(online).pdf', '_self', false)
	}

	var two = new Two({
		width: width,
		height: height,
		fullscreen: true,
		autostart: true
	}).appendTo(document.body)

	// Setup scene
	// add circle
	var scene = two.makeGroup()
	var circle = two.makeCircle(width/2, height/2 + 150, 180)
	// circle.fill = '#AAAAAA'
	// circle.fill = '#f9d448'
	// circle.fill = '#23245A'
	// circle.stroke = 'black'
	circle.linewidth = 0
	scene.add(circle)

	// Create points
	// add wave polygon
	var points = makeAnchorPoints(25)
	var wave = new Two.Polygon(points, true, true)
	wave.stroke = 0
	scene.add(wave)

	// Mouse move event
	addMouseEvent()

	// **
	//
	// Apply our own bindings for two.js resize and update
	two.bind('resize', resize)
	two.bind('update', function() {
		var attack = 0.05
		//Calculate velocity for each point based on last frame
		for(var i = 2; i <= points.length - 2; i++) {
			var delta = points[i-1].y + points[i+1].y - 2*points[i].y
			points[i].velocity = (points[i].velocity + delta*attack) * 0.96
		}
		//Apply velocity in y dimension
		for (var i = 2; i < points.length - 2; i++) {
			points[i].y = points[i].y + points[i].velocity
		}

		wave.fill = '#111111'
		circle.fill = '#888888'
		document.body.style.backgroundColor = "#444444"

		//Lerp color
		// circle.fill = getColor([70, 70, 70], [35, 36, 90], points)
		// wave.fill = getColor([40, 40, 40], [0, 0, 0], points)
		// wave.fill = "#AAAAAA"
		// circle.fill = "#111111"
		// [237, 230, 216]
		// document.body.style.backgroundColor = getColor([180, 180, 180], [232, 218, 195], points)
		// document.getElementById('name').style.color = getAlpha([102, 102, 102], points)

	}).play()
	//Rendering started
	//
	// **

	function resize() {
		scene.translation.set(two.width / 4, two.height / 4)
	}


	function makeAnchorPoints(n) {
		var b = []
		var p = []

		b[0] = new Two.Anchor(0, height)
		b[0].velocity = 0

		// Add 5 left-buffer points
		for (var i = 1; i <= 4; i++) {
			b[i] = new Two.Anchor(-250 + i*50, height/2)
			b[i].velocity = 0
		};
		for (var i = 0; i < n; i++) {
			p[i] = new Two.Anchor( width/n * i, height/2)
			p[i].velocity = 0
		};

		//add 5 right-buffer points
		var l = p.length
		for (var i = 0; i <= 4; i++) {
			var newPoint = new Two.Anchor(width + i*50, height/2)
			newPoint.velocity = 0
			p[l + i] = newPoint
		};
		
		p.push( new Two.Anchor(width, height))

		return b.concat(p)
	}


	function addMouseEvent(argument) {
		var lastMouse = new Two.Vector(0, 0)
		var currMouse = new Two.Vector(0, 0)
		var mouseVel = new Two.Vector(0, 0)
		var svg = document.querySelector('svg')

		svg.addEventListener('mousemove', function(e) {
			currMouse.set(e.offsetX, e.offsetY)
			mouseVel.sub(currMouse, lastMouse)
			if (currMouse.y >= height/2) {
				var v = clamp(mouseVel.length(), 40)
				var closest = findClosestAnchors(3, currMouse)
				closest[0].velocity += 0.06 * v
				closest[1].velocity += 0.03 * v
				closest[2].velocity += 0.03 * v
			}
			lastMouse.copy(currMouse)
		})
	}

	function findClosestAnchors(n, pos) {
		var sortedPoints = points.slice(0, points.length - 4)
		sortedPoints.sort(function(p1, p2) {
			var d1 = Math.sqrt( Math.pow(p1.x - pos.x, 2) + Math.pow(p1.y - pos.y, 2) )
			var d2 = Math.sqrt( Math.pow(p2.x - pos.x, 2) + Math.pow(p2.y - pos.y, 2) )
			//Possible clean up:
			// var d1 = pos.distanceTo(p1)
			// var d2 = pos.distanceTo(p2)
			if (d1 > d2) {
				return 1;
			}
			if (d1 < d2) {
				return -1;
			}
			return 0;
		})
		return sortedPoints.slice(0, n)
	}
} // End main

// Returns percentage of circle visible in decimal form
function getColor(c1, c2, points) {
	var min = height/2
	var measurePoint = points[points.length/2].y
	var p = (measurePoint - min) / 260

	var r = Math.round(lerp(c1[0], c2[0], p))
	var g = Math.round(lerp(c1[1], c2[1], p))
	var b = Math.round(lerp(c1[2], c2[2], p))

	var rbgStr = 'rgb(' + r + ',' + g + ',' + b +')'

	return rbgStr
}

function getAlpha(c, points) {
	var min = height/2
	var measurePoint = points[points.length/2].y
	var p = (measurePoint - min) / 260

	var a = p*1

	var rbgStr = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a +')'

	return rbgStr
}

lerp = function(a, b, u) {
    return (1 - u) * a + u * b;
};

function clamp(num, max) {
  return Math.min(num, max);
}


window.onload = main