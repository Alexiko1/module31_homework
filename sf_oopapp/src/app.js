import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import adminFieldTemplate from "./templates/adminField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateUser, writeTask, searchCountTask, countTask } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";

export const appState = new State();

const loginForm = document.querySelector("#app-login-form");

if (!authUser("admin", "admin")) {
	generateUser(User, "admin", "admin");
}

loginForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const formData = new FormData(loginForm);
	const login = formData.get("login");
	const password = formData.get("password");
	if (authUser(login, password)) {
		const title= document.querySelector("#title");
		const buttonLogout = document.createElement('button');
		const hellowText = document.createElement('p');
		loginForm.style.visibility = "hidden";
		buttonLogout.setAttribute("class", "btn btn-primary");
		hellowText.setAttribute("class", "text-white");
		buttonLogout.setAttribute("type", "button");
		buttonLogout.innerHTML= "Logout";
		hellowText.innerHTML = 'Здравствуйте, ' + login;
		title.appendChild(hellowText);
		title.appendChild(buttonLogout);
		buttonLogout.onclick = function() {
			document.querySelector("#content").innerHTML = `            
				<h1>
	            Main page – performance issues  
	         </h1>
	         <p>
			    <br>
                Это был темный лес, издали казавшийся непроходимым. Там Пахапиль <br>
                охотился, глушил рыбу, спал на еловых ветках. Короче – жил, пока <br>
                русские не выгнали оккупантов. А когда немцы ушли, Пахапиль <br>
                вернулся. Он появился в Раквере, где советский капитан наградил его <br>
                медалью. Медаль была украшена четырьмя непонятными словами, <br>
                фигурой и восклицательным знаком.
            </p>`;
	      buttonLogout.remove();
	      hellowText.remove();
	      loginForm.style.visibility = "visible";
	  	};
	};

  let adminField = (login== "admin" && password == "admin")
  	 ? adminFieldTemplate
  	 : taskFieldTemplate

  let fieldHTMLContent = authUser(login, password)
    ? adminField
    : alert("Неправильно указан пароль или логин, попробуйте еще раз!");

  document.querySelector("#content").innerHTML = fieldHTMLContent;

  if (fieldHTMLContent == taskFieldTemplate) {
  		const readyTask = document.querySelector("#buttonReady");
  		const progressTask = document.querySelector("#buttonProgress");
  		const finishedTask = document.querySelector("#buttonFinished");
  		const resultReady = document.querySelector("#ready");
  		const resultProgress = document.querySelector("#progress");
  		const resultFinished = document.querySelector("#finished");
		readyTask.addEventListener("click", ()=> {
			countTask (resultReady, "input", '#countActiveTask');
			if (readyTask.innerHTML == "+ add Card") {
				let mainTask = document.createElement('div');
				let newTask = document.createElement('input');
				let buttonTask = document.createElement('button');
				let subTitle = document.createElement('div');
				mainTask.setAttribute("class", "input-group mb-3")
				newTask.setAttribute("type", "text");
				newTask.setAttribute("class", "form-control");
				subTitle.setAttribute("class", "input-group-append");
				buttonTask.setAttribute("class", "btn btn-outline-secondary");
				buttonTask.setAttribute("type", "button");
				buttonTask.innerHTML=`<img src="./src/picture/delete.png">`;
				buttonTask.onclick = function() {
    				mainTask.remove();
    				countTask (resultReady, "input", '#countActiveTask');
    				searchCountTask('input', resultReady, progressTask);
  				};
				readyTask.innerHTML = "Submit";
				resultReady.appendChild(mainTask);
				mainTask.appendChild(newTask);
				mainTask.appendChild(subTitle);
				subTitle.appendChild(buttonTask);
			} else {
				readyTask.innerHTML = "+ add Card";
				searchCountTask("input", resultReady, progressTask);
			}
		});
		progressTask.addEventListener("click", ()=> {
			writeTask ("input", resultReady);
			writeTask ("select", resultProgress);
			if (progressTask.innerHTML == "+ add Card") {
				let newSelected = document.createElement('select');
				let arrayReady = JSON.parse(localStorage.getItem("input"));
				let mainTask = document.createElement('div');
				mainTask.setAttribute("class", "input-group mb-3");
				newSelected.setAttribute("class", "custom-select");
				resultProgress.appendChild(mainTask);
				mainTask.appendChild(newSelected);
				for (var i = 0; i < arrayReady.length; i++) {
					let newOption = document.createElement('option');
					newOption.innerHTML = arrayReady[i];
					newSelected.appendChild(newOption);
				};
				progressTask.innerHTML = "Submit";
			} else {
			  	let blockTask = resultProgress.querySelectorAll('select');
			  	let allReadyTask = resultReady.querySelectorAll('input');
			  	let allTask = resultReady.querySelectorAll('.input-group');
			  	blockTask[blockTask.length - 1].setAttribute("disabled", "disabled");
				progressTask.innerHTML = "+ add Card";
				for (let i = 0; i < allReadyTask.length; i++) {
					if (blockTask[blockTask.length - 1].value == allReadyTask[i].value) {
						allTask[i].remove();
					}
				};
				searchCountTask('select', resultProgress, finishedTask);
				searchCountTask('input', resultReady, progressTask);
				countTask (resultReady, "input", '#countActiveTask');
			}
		});
		finishedTask.addEventListener("click", ()=> {
			writeTask ("select", resultProgress);
			if (finishedTask.innerHTML == "+ add Card") {
				let newSelected = document.createElement('select');
				let arrayReady = JSON.parse(localStorage.getItem("select"));
				let mainTask = document.createElement('div');
				mainTask.setAttribute("class", "input-group mb-3");
				newSelected.setAttribute("class", "custom-select");
				resultFinished.appendChild(mainTask);
				mainTask.appendChild(newSelected);
				for (var i = 0; i < arrayReady.length; i++) {
					let newOption = document.createElement('option');
					newOption.innerHTML = arrayReady[i];
					newSelected.appendChild(newOption);
				};
				finishedTask.innerHTML = "Submit";
			} else {
			  	let blockTask = resultFinished.querySelectorAll('select');
			  	let allProgressTask = resultProgress.querySelectorAll('select');
			  	blockTask[blockTask.length - 1].setAttribute("disabled", "disabled");
				finishedTask.innerHTML = "+ add Card";
				for (let i = 0; i < allProgressTask.length; i++) {
					if (blockTask[blockTask.length - 1].value == allProgressTask[i].value) {
						allProgressTask[i].remove();
					}
				};
				searchCountTask('select', resultProgress, finishedTask);
				countTask (resultFinished, "select", '#countFinishedTask');
			}
		});
  }else if(fieldHTMLContent == adminFieldTemplate) {
	  	const adminForm = document.querySelector("#admin-login-form");
	  	const buttonBoard = document.querySelector("#board");
		adminForm.addEventListener("submit", function (e) {
			e.preventDefault();
			const formData = new FormData(adminForm);
			const login = formData.get("login");
			const password = formData.get("password");
			generateUser(User, login, password);
			alert("Создан " + login);
		});
		buttonBoard.addEventListener('click', function (){
			document.querySelector("#content").innerHTML = taskFieldTemplate;
		});
   }

});
