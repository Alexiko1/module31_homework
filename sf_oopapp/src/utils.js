export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateUser = function (User, login, password) {
  const testUser = new User(login, password);
  User.save(testUser);
};

export const writeTask = function  (selector, result) {
	let elements = result.querySelectorAll(selector),
        data = localStorage.getItem(selector),
        array = [];
   for (var i = 0; i < elements.length; i++) {
   	array.push(elements[i].value);
   };
   localStorage.setItem(selector, JSON.stringify(array));
    if(data) { 
        data = JSON.parse(data);
    } else {
        data = {};
    }
};

export const searchCountTask = function (selector, board, buttonBoard){
	let countTask = board.querySelectorAll(selector);
	if (countTask.length == 0) {
		buttonBoard.setAttribute("disabled", "disabled");
	}else {
		buttonBoard.removeAttribute("disabled");
	}
}

export const countTask = function (board, selector, buttonBoard){
	let countReady = board.querySelectorAll(selector);
	let countReadyTask = document.querySelector(buttonBoard);
	countReadyTask.innerHTML = countReady.length;
} 
 
