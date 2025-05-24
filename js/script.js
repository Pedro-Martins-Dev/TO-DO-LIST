const formularioTarefa = document.getElementById('formularioTarefa');
const inputTituloTarefa = document.getElementById('tituloTarefa');
const inputDataTarefa = document.getElementById('dataTarefa');
const inputComentarioTarefa = document.getElementById('comentarioTarefa');
const selectPrioridadeTarefa = document.getElementById('prioridadeTarefa');
const dataCriacao = new Date().toISOString();
const radioNotificacaoSim = document.getElementById('notificacaoSim');
const radioNotificacaoNao = document.getElementById('notificacaoNao');
const botaoCancelar = document.getElementById('botaoCancelar');



const tbodyListaTarefas = document.getElementById('listaTarefas');
const mensagemSemTarefas = document.getElementById('mensagemSemTarefas');

let tarefas = [];

function carregarTarefas() 
{
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) 
        {
        tarefas = JSON.parse(tarefasSalvas);
        console.log('Tarefas carregadas do localStorage:', tarefas);
    } 
    else 
    {
        console.log('Nenhuma tarefa encontrada no localStorage.');
    }
}

function exibirTarefasNaLista() {
    if (!tbodyListaTarefas) return;

    tbodyListaTarefas.innerHTML = '';

    if (tarefas.length === 0) {
        if (mensagemSemTarefas) mensagemSemTarefas.style.display = 'block';
        return;
    } else {
        if (mensagemSemTarefas) mensagemSemTarefas.style.display = 'none';
    }

    tarefas.forEach((tarefa, index) => {
        const linhaTarefa = tbodyListaTarefas.insertRow();

        // 1. Feita
        const celulaFeita = linhaTarefa.insertCell();
        const checkboxFeita = document.createElement('input');
        checkboxFeita.type = 'checkbox';
        checkboxFeita.classList.add('form-check-input');
        checkboxFeita.checked = tarefa.feita || false;
        checkboxFeita.addEventListener('change', function () {
            marcarComoFeita(index, this.checked);
        });
        celulaFeita.appendChild(checkboxFeita);
        celulaFeita.classList.add('text-center');

        const celulaTitulo = linhaTarefa.insertCell();
        celulaTitulo.textContent = tarefa.titulo;

        const celulaPrioridade = linhaTarefa.insertCell();
        celulaPrioridade.textContent = tarefa.prioridade;

        const celulaDataCriacao = linhaTarefa.insertCell();
        celulaDataCriacao.textContent = tarefa.dataCriacaoTarefa || 'Não disponível';

        const celulaData = linhaTarefa.insertCell();

        const celulaAcoes = linhaTarefa.insertCell();
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('btn', 'btn-danger', 'btn-sm');
        botaoExcluir.addEventListener('click', function () {
            excluirTarefa(index);
        });
        celulaAcoes.appendChild(botaoExcluir);
        celulaAcoes.classList.add('text-center');

        if (tarefa.dataTarefa && !isNaN(new Date(tarefa.dataTarefa).getTime())) {
            celulaData.textContent = new Date(tarefa.dataTarefa).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        } else {
            celulaData.textContent = 'Data inválida';
        }

        // Destacar tarefa concluída
        if (tarefa.feita) {
            linhaTarefa.classList.add('tarefa-concluida');
        }
    });
}

function excluirTarefa(indice) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tarefas.splice(indice, 1); // remove 1 tarefa no índice dado
        salvarTarefas(); // salva novamente no localStorage
        exibirTarefasNaLista(); // atualiza a tabela
    }
}


function salvarTarefas() 
{
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function marcarComoFeita(indice, status) {
    if (tarefas[indice]) {
        tarefas[indice].feita = status;
        salvarTarefas();
        exibirTarefasNaLista();
    }
}

if (formularioTarefa) {
    formularioTarefa.addEventListener('submit', function(event) {
        event.preventDefault();

        const titulo = inputTituloTarefa.value;
        const dataTarefa = inputDataTarefa.value;
        const comentario = inputComentarioTarefa.value;
        const prioridade = selectPrioridadeTarefa.value;
        const notificacao = radioNotificacaoSim.checked ? 'SIM' : 'NÃO';
        const dataCriacaoTarefa = new Date().toLocaleDateString('pt-BR');

        const novaTarefa = {
            titulo: titulo,
            dataTarefa: dataTarefa,
            comentario: comentario,
            prioridade: prioridade,
            notificacao: notificacao,
            dataCriacaoTarefa: dataCriacaoTarefa,
            feita: false
        };

        tarefas.push(novaTarefa);
        salvarTarefas();
        formularioTarefa.reset();
        if (radioNotificacaoNao) radioNotificacaoNao.checked = true; 

        alert('Tarefa cadastrada com sucesso!');
    });

    if (botaoCancelar) {
        botaoCancelar.addEventListener('click', function() {
            formularioTarefa.reset();
            if (radioNotificacaoNao) radioNotificacaoNao.checked = true;
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    carregarTarefas();

    if (document.getElementById('listaTarefas')) 
    {
        exibirTarefasNaLista();
    }
});