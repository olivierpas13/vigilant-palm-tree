const inputTask = document.getElementById("task-input");
const listContainer = document.getElementById("list-container");

//save the data of all the tasks in the <ul> in the local storage 
const saveData = () =>{
	localStorage.setItem("data",listContainer.innerHTML);
}

//create a <li> element when adding a task
const addTask = () =>{
	//check if the input is valid
	if(inputTask.value === ""){
		alert("Por favor agregue una tarea");
	}else{
		//create the <li> element and add it to the <ul>
		const li = document.createElement("li");
		li.innerHTML = inputTask.value;
		listContainer.appendChild(li);

		//add the trash can icon to the <li>
		let spanIcons = document.createElement("span");
		spanIcons.classList.add("icons");
		spanIcons.innerHTML = `
			<img src="img/bin.png">
		`;

		li.appendChild(spanIcons);
	}

	//clear the task value from the input
	inputTask.value = "";
	saveData();
}

listContainer.addEventListener("click", (e) => {
	//check whenever a certain element is clicked
	if(e.target.tagName === "LI"){ //<li> too change the state of the task
		e.target.classList.toggle("checked");
		saveData();
	}else if(e.target.tagName === "SPAN"){ //<span> to remove the task
		e.target.parentElement.remove();
		saveData();
	}else if(e.target.tagName === "IMG"){ //<img> to remove the task
		e.target.parentElement.parentElement.remove();
		saveData();
	}
},false);

//load the stored data from the local storage
const loadData = () => {
	listContainer.innerHTML = localStorage.getItem("data");
}

loadData();