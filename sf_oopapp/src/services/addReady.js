const readyTask = document.querySelector("#buttonReady");
export function addReady () {
	let result = document.querySelector("#ready");
	if (readyTask.innerHTML == "+ add Card") {
		let newTask = document.createElement('input');
		readyTask.innerHTML = "Submit";
		result.appendChild(newTask);
	} else {
	  	let blockTask = result.querySelector('input:last-child');
	  	blockTask.setAttribute("disabled", "disabled");
		readyTask.innerHTML = "+ add Card";
	}
}