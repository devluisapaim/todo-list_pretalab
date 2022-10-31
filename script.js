let id = 0;
let height = 0;

const data = {
    colectTasks: () => JSON.parse(localStorage.getItem('tasks-list')),
    editTasks: (taskList) => localStorage.setItem('tasks-list', JSON.stringify(taskList))
}

const task = (id, task, deadline) => ` <div class="taskDescription">          
                                            <input class="taskCheck" type="checkbox" onchange="checkTask(${id})" />
                                            <p class="taskName" id="${id}">${task}</p>
                                            <img class="taskDelete" onclick="removeTask(${id})" src="./img/trash_icon.svg" alt="">                            
                                        </div>` 

const checkTask = (id) => {
    const strike = document.getElementById(`strike${id}`);
    if (strike) {
        document.getElementById(id).innerText = strike.innerHTML;
    } else {
        const taskDone = document.getElementById(id).innerHTML;
        document.getElementById(id).innerHTML = `<strike id='strike${id}'>${taskDone}</strike>`;
    }
}

function showList() {
    const tasks = data.colectTasks();
    if (tasks) {
        tasks.forEach(listedTask => {
            id++;
            document.querySelector('#tasks').innerHTML += task(id, listedTask);
        });
    }
}

const validateTask = (newTask) => {
    let existingTask = false;
    const taskList = data.colectTasks();

    if (taskList) {
        taskList.map(task => {
            if (task === newTask) {
                existingTask = true;
                alert('Tareja já existente. Adicione nova!');
            }
        });
    }

    return existingTask;
}

function addTask() {            
    id++;
    height++;

    const newTask = document.getElementById('newTask').value;
    const taskList = localStorage.getItem('tasks-list');
    
    if (validateTask(newTask)){
         return;
    }     

    if (taskList) {
        const newList = JSON.parse(taskList);
        
        if (newList.length <= 6) {
            newList.push(newTask);
            document.querySelector('#tasks').innerHTML += task(id, newTask);
        } else {
            alert('Limite de tarefas atingido. Exclua as atividades concluídas!')
        }
        data.editTasks(newList);
    } else {
        data.editTasks([newTask]);
    }
}

const removeTask = (id) => {
    const deletedTask = document.getElementById(id).innerHTML;
    const tasksList = data.colectTasks();
    const newTaskList = tasksList.filter(task => task != deletedTask);
    data.editTasks(newTaskList);
    document.querySelector('#tasks').innerHTML = '';
    showList(); 
}

showList();
