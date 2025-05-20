function validarLogin(event) {
    event.preventDefault();

    const usuarioDigitado = document.getElementById("login-input").value;
    const senhaDigitada = document.getElementById("senha-input").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(user =>
        user.usuario === usuarioDigitado && user.senha === senhaDigitada
    );

    if (usuarioValido) {
        window.location.href = "/listar-medicamentos/tela-listar-medicamentos.html";
        /*SALVA ID DO USUARIO LOGADO*/
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
    } else {
        alert("Usuário ou senha incorretos.");
    }
}

/*TECLA ENTER TER A MESMA FUNÇÃO QUE O BOTÃO LOGIN*/
document.addEventListener("DOMContentLoaded", function () {
    const senhaInput = document.getElementById("senha-input");

    senhaInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            validarLogin(event);
        }
    });
});

/*
    UAUÁRIOS INSERIDOS NO LOCAL STORAGE PARA VALIDAÇÃO DO LOGIN E SENHA
    const usuarios = [
    { id: 1, usuario: "admin", senha: "1234" },
    { id: 2, usuario: "joao", senha: "senha123" },
    { id: 3, usuario: "maria", senha: "abc123" }
];

localStorage.setItem("usuarios", JSON.stringify(usuarios));

*/