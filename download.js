// var pdf = new jsPDF('p', 'pt', 'letter')

// console.log(pdf)

// html2canvas(document.body, {
// 		onrendered: function(canvas) {
// 			console.log('done')
// 		}
// })

function download() {
	var pdf = new jsPDF('p', 'pt', 'letter');
	// console.log(pdf)

	pdf.addHTML($('#resume')[0], function() {
		console.log('done')
		// pdf.save('testResume.pdf')
	})
}


window.onload = download

// pdf.addHTML($('body'), function () {
//    pdf.save('Test.pdf');
// });

