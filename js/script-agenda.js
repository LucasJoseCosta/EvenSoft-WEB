var buttonNovoEvento = document.getElementById('buttonNovoEvento')
var buttonFecharNovoEvento = document.getElementById('buttonFecharNovoEvento')
var buttonFecharEditarEvento = document.getElementById('buttonFecharEditarEvento')
var novoEvento = document.getElementById('novoEvento')
var editarEvento = document.getElementById('editarEvento')
var formEditarEvento = document.getElementById('formEditarEvento')
var formNovoEvento = document.getElementById('formNovoEvento')
var inputNomeEvento = document.getElementById('nomeEvento')
var inputDataEvento = document.getElementById('dataEvento')
var inputDescricaoEvento = document.getElementById('descricaoEvento')
var inputNomeEditarEvento = document.getElementById('nomeEditarEvento')
var inputDataEditarEvento = document.getElementById('dataEditarEvento')
var inputDescricaoEditarEvento = document.getElementById('descricaoEditarEvento')
var divMensagemErro = document.getElementById('mensagemErro')
var tabelaEventos = document.getElementById('tabelaEventos')
var editorEventoHidden = document.getElementsByName('editorEventoHidden')
var salvarDataHoraISO = ''

var listaEventos = [];

function removerEvento(event){
    var posicao = event.target.getAttribute('data-delete-event');
    listaEventos.splice(posicao, 1);
    atualizarTabelaEventos()
}

function editarEventoAtual(){
  editarEvento.classList.remove('d-none')

  const inputDataHidden = document.getElementsByName(`salvarDataHoraISO_${this.id}`)[0];
  console.log(inputDataHidden)

  const nomeDoEvento = document.getElementById(this.id).getElementsByTagName('td')[0].textContent;
  const data = document.getElementById(this.id).getElementsByTagName('td')[1].textContent;
  const descricao = document.getElementById(this.id).getElementsByTagName('td')[2].textContent;
  console.log(nomeDoEvento, data, descricao);

  const date_ = new Date(inputDataHidden.value);
  date_.setMinutes(date_.getMinutes() - date_.getTimezoneOffset())

  inputNomeEditarEvento.value = nomeDoEvento;
  inputDataEditarEvento.value = date_.toISOString().slice(0, -1);
  inputDescricaoEditarEvento.value = descricao;

  editorEventoHidden.value = this.id;
}

function salvarEditarEvento(event){
  event.preventDefault();

  

  var nomeEditadoEvento = inputNomeEditarEvento.value;
  var dataEditadaEvento = inputDataEditarEvento.value;
  var descricaoEditadoEvento = inputDescricaoEditarEvento.value;

  var dataEditar = new Date(dataEditadaEvento)
  var dataFormatadaEditar = "data: " + ((dataEditar.getDate())) + "/" + ((dataEditar.getMonth() + 1)) + "/" + dataEditar.getFullYear() + " hora:" + dataEditar.getHours() + ":" + dataEditar.getMinutes();

  const id = editorEventoHidden.value;

  document.getElementById(id).getElementsByTagName('td')[0].innerHTML = nomeEditadoEvento;
  document.getElementById(id).getElementsByTagName('td')[1].innerHTML = dataFormatadaEditar;
  document.getElementById(id).getElementsByTagName('td')[2].innerHTML = descricaoEditadoEvento;

  var inputHiddenEditado = document.getElementById(id).getElementsByTagName('input')[0]

  inputHiddenEditado.value = dataEditar

  console.log(inputHiddenEditado)

  console.log(nomeEditadoEvento, dataEditadaEvento, descricaoEditadoEvento)

  fecharEditarEvento()
}

function atualizarTabelaEventos(){
  if(listaEventos.length === 0){
    tabelaEventos.innerHTML = '<tr><td colspan="3">Nenhum evento</td></tr>';
    return;
  }
  tabelaEventos.innerHTML = '';
  for(var i = 0; i < listaEventos.length; i++){
    var evento = listaEventos[i];


    const uniq = 'id_' + Math.random().toString(16).slice(2);

    var linha = document.createElement('tr');
    var botaoEditar = document.createElement('button');

    var elementDataHidden = document.createElement('input');
    elementDataHidden.setAttribute('name', `salvarDataHoraISO_${uniq}`);
    elementDataHidden.setAttribute('type','hidden');

    salvarDataHoraISO = evento.data;
    elementDataHidden.value = salvarDataHoraISO;

    linha.setAttribute('id', uniq);
    botaoEditar.setAttribute('id', uniq);

    var celulaNome = document.createElement('td');
    var celulaData = document.createElement('td');
    var celulaDescricao = document.createElement('td')
    var celulaAcoes = document.createElement('td');
    var botaoExcluir = document.createElement('button');

    var data = new Date(evento.data)
    var dataFormatada = "data: " + ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear() + " hora:" + data.getHours() + ":" + data.getMinutes();

    botaoEditar.classList.add('btn');
    botaoEditar.classList.add('btn-custom-register');
    botaoEditar.classList.add('btn-small');
    botaoEditar.classList.add('mr-2');
    botaoEditar.addEventListener('click', editarEventoAtual)
    botaoEditar.addEventListener('click', fecharNovoEvento)
    botaoEditar.innerHTML = "Editar";
    celulaAcoes.appendChild(botaoEditar)
    botaoExcluir.setAttribute('data-delete-event', i);
    botaoExcluir.classList.add('btn');
    botaoExcluir.classList.add('btn-danger');
    botaoExcluir.classList.add('btn-small');
    botaoExcluir.addEventListener('click', removerEvento);
    celulaNome.innerText = evento.nome;
    celulaData.innerText = dataFormatada;
    celulaDescricao.innerText = evento.descricao;
    botaoExcluir.innerHTML = "Remover";
    celulaAcoes.appendChild(botaoExcluir);
    linha.appendChild(celulaNome);
    linha.appendChild(celulaData);
    linha.appendChild(celulaDescricao);
    linha.appendChild(celulaAcoes);
    tabelaEventos.appendChild(linha);

    celulaAcoes.appendChild(elementDataHidden);
  }
}

function limparEvento(){
  inputNomeEvento.value = '';
  inputDataEvento.value = '';
  inputNomeEvento.classList.remove('is-invalid');
  inputDataEvento.classList.remove('is-invalid');
  divMensagemErro.classList.add('d-none');
  divMensagemErro.innerHTML = '';
}

function limparEditarEvento(){
  inputNomeEditarEvento.value = '';
  inputDataEditarEvento.value = '';
  inputNomeEditarEvento.classList.remove('is-invalid');
  inputDataEditarEvento.classList.remove('is-invalid');
}

function mostraNovoEvento(){
  novoEvento.classList.toggle('d-none');
}

function fecharNovoEvento() {
  novoEvento.classList.add('d-none');
  limparEvento()
}

function fecharEditarEvento() {
  editarEvento.classList.add('d-none');
  limparEditarEvento()
}

function novoEventoValido(nomeEvento, dataEvento){
  var validacaoOK = true;
  var mensagemErro = '';
  var timestampEvento = Date.parse(dataEvento);
  var timestampAtual = (new Date()).getTime();
  if(nomeEvento.trim().length == 0){
    mensagemErro = 'O nome do evento é obrigatório!';
    inputNomeEvento.classList.add('is-invalid');
    validacaoOK = false;
  } else {
    inputNomeEvento.classList.remove('is-invalid');
  }
  if(isNaN(timestampEvento) || timestampEvento < timestampAtual){
    if(mensagemErro.length > 0){
      mensagemErro += '<br>'
    }
    mensagemErro += 'A data e hora são obrigatórias e Somente datas futuras!';
    inputDataEvento.classList.add('is-invalid');
    validacaoOK = false;
  } else {
    inputDataEvento.classList.remove('is-invalid');
  }
  if(!validacaoOK) {
    divMensagemErro.innerHTML = mensagemErro
    divMensagemErro.classList.remove('d-none')
  }else{
    divMensagemErro.classList.add('d-none')
  }
  return validacaoOK;
}


function salvarNovoEvento(event) {
  event.preventDefault();
  var nomeEvento = inputNomeEvento.value;
  var dataEvento = inputDataEvento.value;
  var descricaoEvento = inputDescricaoEvento.value;

  if(novoEventoValido(nomeEvento, dataEvento)){
    console.log(`evento valido`);
    listaEventos.push({
      nome: nomeEvento,
      data: new Date(dataEvento),
      descricao: descricaoEvento
    });
    atualizarTabelaEventos();
    fecharNovoEvento();
  } else{
    console.log('evento invalido');
  }
}


buttonNovoEvento.addEventListener('click', mostraNovoEvento);
buttonNovoEvento.addEventListener('click', fecharEditarEvento)
buttonFecharNovoEvento.addEventListener('click', fecharNovoEvento);
formNovoEvento.addEventListener('submit', salvarNovoEvento);
buttonFecharEditarEvento.addEventListener('click', fecharEditarEvento);
formEditarEvento.addEventListener('submit', salvarEditarEvento);
window.addEventListener('load', atualizarTabelaEventos)
