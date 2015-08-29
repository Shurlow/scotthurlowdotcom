//Download resume
function download() {
	var button = document.getElementById('dl')
	var link = document.createElement('a')
	link.download = 'hurlow_resume.pdf'
	link.href = 'https://dl.dropboxusercontent.com/u/14283457/hurlow_resume.pdf';

	button.addEventListener('mouseup', function(e) {
		console.log('dl')
		link.click()
		console.log(button)

		button.style.color = 'orangered'
		setTimeout(function() {
			button.style.color = 'black'
		}, 130)

	})
}

window.onload = download

