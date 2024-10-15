// Code could be cleaner and functions should be arrow functions to avoid hoisting problems 

document.addEventListener('DOMContentLoaded', function(){
    const listForm = document.getElementById('list');
    const activitiesInput = document.getElementById('activities');
    const tasksList = document.createElement('ul');
    const errorMessage = document.getElementById('errorMessage');

    document.body.appendChild(tasksList);

    loadTasks();

    listForm.addEventListener('submit', function(e){
        e.preventDefault();
        const task = activitiesInput.value.trim();

        if(task === "") {
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
            addTask(task);
            saveTask(task);
            activitiesInput.value = '';
        }
    });

    listForm.addEventListener('reset', function(e){
        activitiesInput.value = '';
        errorMessage.style.display = 'none';
    });

    function loadTasks(){
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task);
        });
    }

    function addTask(task){
        const li = document.createElement('li');

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-ghost');
        li.appendChild(icon);

        const textNode = document.createTextNode(` ${task}`);
        li.appendChild(textNode);
    
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.addEventListener('click', function(){
            li.remove();
            deleteTask(task);
        });

        li.appendChild(deleteBtn);
        tasksList.appendChild(li);
    }

    function saveTask(task){
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(task){
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});