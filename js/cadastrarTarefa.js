const formularioTarefa = document.getElementById('formularioTarefa');
const inputTituloTarefa = document.getElementById('tituloTarefa');
const inputDataTarefa = document.getElementById('dataTarefa');
const inputComentarioTarefa = document.getElementById('comentarioTarefa');
const selectPrioridadeTarefa = document.getElementById('prioridadeTarefa');
const radioNotificacaoSim = document.getElementById('notificacaoSim');
const radioNotificacaoNao = document.getElementById('notificacaoNao');
const botaoCancelar = document.getElementById('botaoCancelar');
const divListaTarefas = document.getElementById('listaTarefas');
const mensagemSemTarefas = document.getElementById('mensagemSemTarefas');

let tarefas = [];

formularioTarefa.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Coleta os valores dos campos
    const titulo = inputTituloTarefa.value;
    const dataTarefa = inputDataTarefa.value;
    const comentario = inputComentarioTarefa.value;
    const prioridade = selectPrioridadeTarefa.value;
    const notificacao = radioNotificacaoSim.checked ? 'SIM' : 'NÃO'; 
    const dataCriacao = new Date().toISOString();

    const novaTarefa = {
        titulo: titulo,
        dataTarefa: dataTarefa,
        comentario: comentario,
        prioridade: prioridade,
        notificacao: notificacao,
        dataCriacao: dataCriacao
    };

    const tarefaJSON = JSON.stringify(novaTarefa);
    console.log('Tarefa cadastrada em JSON:', tarefaJSON);

    tarefas.push(novaTarefa);
    console.log('Array de tarefas:', tarefas);

    formularioTarefa.reset();
    radioNotificacaoNao.checked = true; // Garante que "NÃO" em notificação fique marcado por padrão

});

botaoCancelar.addEventListener('click', function() {
    formularioTarefa.reset(); // Limpa todos os campos do formulário
    radioNotificacaoNao.checked = true; // Garante que "NÃO" em notificação fique marcado por padrão
});