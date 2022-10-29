let id = 0;
let height = 0; // no máximo 8 captar a altura de cada div, somar à variavel a cada adição e condicionar a adição até a soma igualar a altura total de tasks

/* const tarefa recebe e cria div para cada nova tarefa c/ prazo adicionada */
const tarefa = (id, novaTarefa, prazo) => ` <div id="${id}">          
                            <input type="checkbox" />
                            <p>${novaTarefa}</p>
                            <p>${prazo}</p>
                            <img onclick="removeTask(${id})" src="./img/trash_icon.svg" alt="">                            
                        </div>` 

/* função que varia id, limita a quant de criação de tarefa a 8, 
coleta o valor do input newTask e 
chama a const/função tarefa passando o valor de id, newTask e o prazo*/

function addTask() {            
    id++;
    height++;

    let newTask = document.getElementById('novaTarefa').value;
    let deadline = document.querySelector('#prazo').value;
    
    if (height <= 8) {
        document.querySelector('#tasks').innerHTML += tarefa(id, newTask, deadline);
    }    
}

function removeTask(id) {
    //deletar tarefa o clicar na imagem
    console.log(`${id}`);

    
    //descobrir como "pegar" da task em questão

    /*Na aula, Nath add em um array, cria um novo array com os nomes e
     manipula este para excluir o desejado; usando filter e condicional */
}
