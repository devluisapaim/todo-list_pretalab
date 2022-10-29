let id = 0;
let height = 0; // no máximo 8 captar a altura de cada div, somar à variavel a cada adição e condicionar a adição até a soma igualar a altura total de tasks

const data = {
    colectTasks: () => JSON.parse(localStorage.getItem('tasks-list')),
    editTasks: (taskList) => localStorage.setItem('tasks-list', JSON.stringify(taskList))
}

/* const tarefa recebe e cria div para cada nova tarefa c/ prazo adicionada */
const task = (id, novaTarefa, prazo) => ` <div>          
                                            <input type="checkbox" />
                                            <p id="${id}">${novaTarefa}</p>
                                            <p>${prazo}</p>
                                            <img onclick="removeTask(${id})" src="./img/trash_icon.svg" alt="">                            
                                        </div>` 

/* função que varia id, limita a quant de criação de tarefa a 8, 
coleta o valor do input newTask e 
chama a const/função tarefa passando o valor de id, newTask e o prazo*/

function showList() {
    const tasks = data.colectTasks();
    if (tasks) {
        tasks.forEach(listedTask => {
            id++;
            document.querySelector('#tasks').innerHTML += task(id, listedTask);
        });
    }
}

function addTask() {            
    id++;
    height++;

    const newTask = document.getElementById('newTask').value;
    const deadline = document.querySelector('#deadline').value;

    const taskList = localStorage.getItem('tasks-list');
    // if (validarTarefa(newTask)){
    //      return;
    // }
    
    if (height <= 8) {
        document.querySelector('#tasks').innerHTML += task(id, newTask, deadline);
    }    

    if (taskList) {
        const newList = JSON.parse(taskList);
        newList.push(newTask);
        data.editTasks(newList);
    } else {
        data.editTasks([newTask]);
    }
}

const removeTask = (id) => {    //deletar tarefa o clicar na imagem
    //descobrir como "pegar" da task em questão
    const deletedTask = document.getElementById(id).innerHTML;
    const tasksList = data.colectTasks();
    //cria nova lista (filtrando/removendo) sem a task deletada
    const newTaskList = tasksList.filter(task => task != deletedTask);
    data.editTasks(newTaskList);
    document.querySelector('#tasks').innerHTML = '';
    showList(); 

    /*Na aula, Nath add em um array, cria um novo array com os nomes e
     manipula este para excluir o desejado; usando filter e condicional */
}

showList();