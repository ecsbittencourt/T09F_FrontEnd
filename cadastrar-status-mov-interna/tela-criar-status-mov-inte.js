let statusMovimentacaoInternaInput = document.getElementById("input-status-mov-inter");
let editId = new URLSearchParams(window.location.search).get("editId");


statusMovimentacaoInternaInput.addEventListener("keydown", e => {
    if (e.key === 'Enter') {
        if (editId) {
            handleEditarStatusMovimentacaoInterna(e);
            return;
        }
        handleCriarStatusMovimentacaoInterna(e);
    }
});

document.getElementById("criar-status-botao").addEventListener("click", e => {
    if (editId) {
        handleEditarStatusMovimentacaoInterna(e);
        return;
    }
    handleCriarStatusMovimentacaoInterna(e);

});


function handleCriarStatusMovimentacaoInterna(e) {
    postStatusMovimentacaoInterna({
        nome: statusMovimentacaoInternaInput.value
    }).then(() => {
        statusMovimentacaoInternaInput.value = "";
    });
}

function handleEditarStatusMovimentacaoInterna(e) {
    putStatusMovimentacaoInterno(editId, {
        id: editId,
        nome: statusMovimentacaoInternaInput.value
    }).then(() => {
        statusMovimentacaoInternaInput.value = "";
    });
}

async function postStatusMovimentacaoInterna(data) {
    let response = await fetch("http://127.0.0.1:8080/api/status-movimentacao-interna", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    });

    if (!(response.status === 201)) {
        alert("Erro! Não foi possível criar o status!");
        return;
    }

    return response.json();
}

async function putStatusMovimentacaoInterno(id, data) {
    let response = await fetch(`http://127.0.0.1:8080/api/status-movimentacao-interna/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    });

    if (!(response.status === 200)) {
        alert("Erro! Não foi possível atualizar o status!");
        return;
    }

    return response.json();
}