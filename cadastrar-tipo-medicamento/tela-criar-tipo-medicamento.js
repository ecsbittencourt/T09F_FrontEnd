let unidadesDeMedida = getUnidadesDeMedida();
let unidadeMedidaSelect = document.getElementById("unidade-medida-select");
let editId = new URLSearchParams(window.location.search).get("editId");

unidadesDeMedida['values'].forEach(element => {
    let option = document.createElement('option');
    option.value = element.id;
    option.innerText = element.value;
    unidadeMedidaSelect.append(option);
});


let tipoMedicamentoTextInput = document.getElementById("nome-tipo-medicamento-input");


async function handleCriarTipoMedicamento(e) {
    if (!validateInput()) {
        alert("Erro! Algum valor inválido foi inserido.");
        return;
    }
    let newValue = tipoMedicamentoTextInput.value;
    let idUnidadeMedida = unidadeMedidaSelect.options[unidadeMedidaSelect.selectedIndex].value;
    let response = await fetch("http://127.0.0.1:8080/api/tipos-medicamentos", {
        method: "POST",
        headers: {

            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            nome: newValue,
            idUnidadeMedida: idUnidadeMedida
        })
    });
    if(!(response.status === 201)) {
        alert("Erro! Não foi possível criar o tipo!");
        return;
    }
    tipoMedicamentoTextInput.value = "";
    unidadeMedidaSelect.selectedIndex = 0;

}

async function handleEditTipoMedicamento(e) {
    if (!validateInput()) {
        alert("Erro! Algum valor inválido foi inserido.");
        return;
    }
    let newValue = tipoMedicamentoTextInput.value;
    let idUnidadeMedida = unidadeMedidaSelect.options[unidadeMedidaSelect.selectedIndex].value;
    let response = await fetch(`http://127.0.0.1:8080/api/tipos-medicamentos/${editId}`, {
        method: "PUT",
        headers: {

            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            id: editId,
            nome: newValue,
            idUnidadeMedida: idUnidadeMedida
        })
    });
    if(!(response.status === 200)) {
        alert("Erro! Não foi possível alterar o tipo de medicamento!");
        return;
    }
    tipoMedicamentoTextInput.value = "";
    unidadeMedidaSelect.selectedIndex = 0;
}


document.getElementById("criar-tipo-medicamento-btn").addEventListener("click", e => {
    if(editId) {
        handleEditTipoMedicamento(e);
        return;
    }
    handleCriarTipoMedicamento(e);
});


function validateInput() {
    return unidadeMedidaSelect.value && tipoMedicamentoTextInput.value;
}

function getUnidadesDeMedida() {
    // TODO: atualizar para buscar da API, quando a parte de unidade de medida
    // for implementada.
    return JSON.parse(localStorage.getItem("t09f-unidadeMedida"));
}

function getUnidadeMedidaPorNome() {
}