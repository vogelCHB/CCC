const duration = 4 // Gibt an, wie viele Sekunden Video pro Textbox gescrollt werden sollen


// Sucht die IDs aller Elemente mit der Klasse `scrolly` raus und initialisiert ein Scrollytelling
Array.from(document.querySelectorAll(".scrolly")).forEach(scrolly => {
		init(scrolly.id)
})

function handleStepProgress(response, id) {
	let progress = 0
	progress = response.progress * duration + (response.index) * duration // Rechnet die Position im Video in Sekunden aus

	window.requestAnimationFrame(() => { setVideo(progress, id)}) // Performance-Optimierung. Nur neuzeichnen, wenn der Browser ready ist.
}

function setVideo(progress, id) {
	document.querySelector(`#${id} video`).currentTime = progress // Video auf die korrekte Zeit setzen
}

// generic window resize listener event
function handleResize(id, scroller) {
	// 1. update height of step elements
	var figureHeight = window.innerHeight;
	var figureMarginTop = 0;

	d3.select(`#${id} .figure`)
		.style("height", figureHeight + "px")
		.style("top", figureMarginTop + "px");

	// 2. tell scrollama to update new element dimensions
	scroller.resize();
}

function init(id) {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	var scroller = scrollama();

	handleResize(id, scroller);

	scroller
		.setup({
			step: `#${id} .step`,
			offset: 1,
			progress: true,
			debug: false
		})
		.onStepProgress((response) => {handleStepProgress(response, id)})
}