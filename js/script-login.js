
function logar(){
  
  var login = document.getElementById('emailLogin').value;
  var senha = document.getElementById('senhaLogin').value;

  if(login == 'admin@mail.com' && senha == 'admin'){
    console.log('Sucesso');
    location.href = 'agenda.html';
  } else {
    alert('Usuario ou senha incorretos')
  }

}

function irParaPaginaCadastro(){
  location.href="register.html"
}


