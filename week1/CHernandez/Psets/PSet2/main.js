class Task {
    constructor(task) {
        if (typeof task !== 'string' || task.length === 0) {
            throw new Error('La tarea debe ser una cadena no vacía.');
        }
        this.task = task;
    }
}

class ListOfTasks {
    constructor(name, tasks = []) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('El nombre debe ser una cadena no vacía.');
        }
        this.name = name;
        this.tasks = [...tasks];
    }

    addTaskToList(task) {
        if (!(task instanceof Task)) {
            throw new Error('El elemento debe ser una instancia de Task.');
        }
        this.tasks=[...this.tasks,task];
    }

    removeTask(taskToRemove){
        this.tasks=this.tasks.filter(task => task.task !== taskToRemove.task);
    }

    static fromJSON(json) {
        const tasks = json.tasks.map(t => new Task(t.task));
        return new ListOfTasks(json.name, tasks);
    }
}

class ListManager {
    constructor() {
        this.lists = this.loadListsFromStorage();
    }

    loadListsFromStorage() {
        try {
            const data = JSON.parse(localStorage.getItem('taskLists')) || [];
            if (!Array.isArray(data)) throw new Error('El formato de las listas es incorrecto.');
            return data.map(ListOfTasks.fromJSON);
        } catch (error) {
            console.error('Error al cargar las listas:', error);
            return [];
        }
    }

    saveListsToStorage() {
        try {
            localStorage.setItem('taskLists', JSON.stringify(this.lists));
        } catch (error) {
            console.error('No se pudo guardar en el almacenamiento:', error);
        }
    }

    addList(list) {
        if (this.lists.some(existingList => existingList.name === list.name)) {
            alert("Ya existe una lista con ese nombre");
            throw new Error('Ya existe una lista con ese nombre.');
        }

        this.lists = [...this.lists, list];
        this.saveListsToStorage();
    }

    removeList(listToRemove){
        this.lists=this.lists.filter(list => list.name !== listToRemove.name);
        this.saveListsToStorage();
    }

    getAllLists() {
        return [...this.lists];
    }
}

const listManager = new ListManager();
let actualList = null;

const createList = () => {
    const newListName = document.getElementById("newListName").value.trim();

    if (newListName === "") {
        alert("El nombre de la lista no puede estar vacío.");
        return;
    }

    const newList = new ListOfTasks(newListName);
    listManager.addList(newList);
    document.getElementById('newListName').value = '';
    showLists();
};

const showLists = () => {
    const listContainer = document.getElementById('existLists');
    listContainer.innerHTML = '';

    if (listManager.getAllLists().length !== 0) {
        document.getElementById("existLists").innerHTML = 
            `<h3>Selecciona una Lista para ver sus tasks</h3>`;
    }

    listManager.getAllLists().forEach(list => {
        const listDiv = document.createElement('div');
        listDiv.className = 
            'list flex justify-between items-center p-4 mb-3 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer';

        const listTitle = document.createElement('h2');
        listTitle.className = 'text-lg font-medium text-gray-800';
        listTitle.textContent = list.name;
        listDiv.appendChild(listTitle);

        const deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '🗑️';
        deleteIcon.className = 'ml-4 text-red-500 hover:text-red-700 cursor-pointer';
        deleteIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            listManager.removeList(list);
            showLists();
        });
        listDiv.appendChild(deleteIcon);
        listDiv.addEventListener('click', () => showTasks(list));
        listContainer.appendChild(listDiv);
    });
};

const showTasks = (list) => {
    actualList = list;
    document.getElementById('taskContainer').style.display = 'block';
    document.getElementById('taskListTitle').textContent = 
        `Las tasks de la lista ${list.name} son:`;

    const taskContainer = document.getElementById('tasks');
    taskContainer.innerHTML = '';

    actualList.tasks.forEach(element => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 
            'task flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2 shadow';

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = element.task;
        taskTitle.className = 'task-title';
        taskDiv.appendChild(taskTitle);

        const iconContainer = document.createElement('div');
        iconContainer.className = 'flex space-x-2';

        const markComplete = document.createElement('span');
        markComplete.innerHTML = '✔️';
        markComplete.className = 'text-green-500 hover:text-green-700 cursor-pointer';
        markComplete.addEventListener('click', () => {
            taskTitle.classList.toggle('line-through');
            taskDiv.classList.toggle('bg-green-100');
        });
        iconContainer.appendChild(markComplete);

        const deleteTask = document.createElement('span');
        deleteTask.innerHTML = '❌';
        deleteTask.className = 'text-red-500 hover:text-red-700 cursor-pointer';
        deleteTask.addEventListener('click', () => {
            actualList.removeTask(element);
            listManager.saveListsToStorage();
            showTasks(actualList);
        });
        iconContainer.appendChild(deleteTask);
        taskDiv.appendChild(iconContainer);
        taskContainer.appendChild(taskDiv);
    });
};

const createTask = () => {
    const newTaskValue = document.getElementById('newTaskInput').value.trim();

    if (newTaskValue === "") {
        alert("La tarea no puede estar vacía.");
        return;
    }

    const newTask = new Task(newTaskValue);
    actualList.addTaskToList(newTask);
    listManager.saveListsToStorage();
    document.getElementById('newTaskInput').value = '';
    showTasks(actualList);
};

document.getElementById('addTaskButton').addEventListener('click', createTask);
document.getElementById('createListButton').addEventListener('click', createList);

showLists();
