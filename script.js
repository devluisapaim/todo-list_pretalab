let id = 0;
let height = 0; // no máximo 8 captar a altura de cada div, somar à variavel a cada adição e condicionar a adição até a soma igualar a altura total de tasks
// let altura = document.querySelector('.taskList').style.max-height;
// console.log(altura)      LIMITAR nº de entradas a altura ;

const data = {
    colectTasks: () => JSON.parse(localStorage.getItem('tasks-list')),
    editTasks: (taskList) => localStorage.setItem('tasks-list', JSON.stringify(taskList))
}

/* const tarefa recebe e cria div para cada nova tarefa c/ prazo adicionada */
const task = (id, task, deadline) => ` <div class="taskDescription">          
                                            <input class="taskCheck" type="checkbox" onchange="checkTask(${id})" />
                                            <p class="taskName" id="${id}">${task}</p>
                                            <img class="taskDelete" onclick="removeTask(${id})" src="./img/trash_icon.svg" alt="">                            
                                        </div>` 
                                            // <p>${deadline}</p>
/* função que varia id, limita a quant de criação de tarefa a 8, 
coleta o valor do input newTask e 
chama a const/função tarefa passando o valor de id, newTask e o prazo*/

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
            /*if (newTask === '') {   VALIDAR SE O CAMPO NÃO ESTÁ VAZIO
                alert('Digite a descrição de uma tarefa.')
            }*/ if (task === newTask) {
                existingTask = true;
                alert('Tareja já existente. Adicione nova!');
            } if (newTask === '') {     //CONFERIR
                alert('Digite a descrição de uma tarefa.');
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

const removeTask = (id) => {    //deletar tarefa o clicar na imagem
    // "pega" a task em questão
    const deletedTask = document.getElementById(id).innerHTML;
    const tasksList = data.colectTasks();
    //cria nova lista (filtrando/removendo) sem a task deletada
    const newTaskList = tasksList.filter(task => task != deletedTask);
    data.editTasks(newTaskList);
    document.querySelector('#tasks').innerHTML = '';
    showList(); 
}

showList();
