document.addEventListener("DOMContentLoaded", function () {
    const senhaInput = document.getElementById("senha-input");
    senhaInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleLogin(event);
        }
    });

    const botaoLogin = document.getElementById("botao-login");
    botaoLogin.addEventListener("click", e => {
        handleLogin(e);
    });

    const botaoCriar = document.getElementById("botao-criar");
    botaoCriar.addEventListener("click", e => {
        handleCriar(e).then(
            response => {
                if (!(response.status === 201)) {
                    alert("Erro ao criar!");
                    throw new Error("Erro ao criar");
                }
                return response.json();
            }
        ).then(data => {
            localStorage.setItem("usuarioLogado", JSON.stringify({ usuario: data.nome }));
            window.location.href = "/listar-setores/tela-listar-setores.html"
        });

    })
});



function handleCriar(e) {
    const usuarioDigitado = document.getElementById("login-input").value;
    const senhaDigitada = document.getElementById("senha-input").value;
    validarInputs(usuarioDigitado, senhaDigitada);
    return fetch("http://127.0.0.1:8080/api/auth/usuario", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            nome: usuarioDigitado,
            digestSenha: senhaDigitada
        })
    })
}

function handleLogin(e) {
    validarLogin(e);
}

function validarInputs(usuarioDigitado, senhaDigitada) {
    if (!usuarioDigitado || !senhaDigitada) {
        alert("Erro! Algum valor digitado não é valido.");
        throw new Error("Erro! Algum valor digitado não é valido.");
    }
}

function validarLogin(event) {
    event.preventDefault();

    const usuarioDigitado = document.getElementById("login-input").value;
    const senhaDigitada = document.getElementById("senha-input").value;
    try {
        validarInputs(usuarioDigitado, senhaDigitada);
        getUsuario(usuarioDigitado, senhaDigitada).then(data => {
            localStorage.setItem("usuarioLogado", JSON.stringify({ data }));
            window.location.href = "/listar-setores/tela-listar-setores.html"
        });
    } catch (error) {
        alert("Não foi possível fazer o login!");
        return;
    }
}




async function getUsuario(usuario, senha) {
    const response = await fetch("http://127.0.0.1:8080/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({ nome: usuario, digestSenha: senha })
    });

    if (!(response.ok)) {
        alert("Erro! Não foi possível validar o usuário. Tente novamente.");
        throw new Error("Erro! Não foi possível validar o usuário.");
    }

    return response.json();
}